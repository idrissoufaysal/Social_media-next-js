import { getAuth } from "@/lib/authConfig";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const postId = params.id

    try {
        if (!postId) {
            return NextResponse.json({ message: "id not found" }, { status: 404 });
        }

        const existingPost = await prisma.post.findUnique({ where: { id: parseInt(postId) } })

        if (!existingPost) {
            return NextResponse.json({ message: "post not found" }, { status: 404 });
        }

        const result = await prisma.like.count({ where: { postId: parseInt(postId) } })
        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred in /api/post/:id/like (GET)" }, { status: 500 });
    }
}


//Ajouter ou supprimer un like
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const postId = parseInt(params.id);
    const session = await getAuth();
    const userId = session?.user.id;

    if (isNaN(postId)) {
        return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
    }

    try {
        if (!userId) {
            return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
        }

        // Vérifiez que l'utilisateur existe
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Vérifiez que le post existe
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        // Vérifiez si le like existe déjà
        const existingLike = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId
                },
            },
        });

        if (!existingLike) {
             // Ajoute un like
             await prisma.like.create({
                data: {
                    userId,
                    postId
                },
            });
            return NextResponse.json({ message: 'liked' }, { status: 201 });
          
        } else {
             // Supprime le like si déjà présent (unlike)
             await prisma.like.delete({
                where: { id: existingLike.id },
            });
            return NextResponse.json({ message: 'removed' }, { status: 200 });
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        console.error('Error in POST /api/post/:id/like:', error.message);
        return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    }
}