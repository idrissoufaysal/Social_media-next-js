import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (
    req: NextRequest,
    { params }: {
        params: {
            id: string
        }
    }
) => {

    const postId = parseInt(params.id);

    if (isNaN(postId)) {
        // Si l'ID n'est pas un nombre valide
        return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
    }

    try {

        const existingPost = await prisma.post.findUnique({ where: { id: postId } })

        if (!existingPost) {
            return NextResponse.json({ message: "post not found" }, { status: 404 });
        }

        const result = await prisma.comment.findMany({ where: { postId: postId } })
        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred in /api/post/:id/comments (GET)" }, { status: 500 });
    }
}

export const POST = async (req: NextRequest,{ params }: { params: { id: string } }) => {
    const postId = parseInt(params.id);

    if (isNaN(postId)) {
        // Si l'ID n'est pas un nombre valide
        return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
    }
    try {

        const existingPost = await prisma.post.findUnique({ where: { id: postId } })

        if (!existingPost) {
            return NextResponse.json({ message: "post not found" }, { status: 404 });
        }
        const { desc } = await req.json()

        const newComment = await prisma.comment.create({
            data: {
                desc,
                postId,
                userId: 'ddsad556', // Assuming req.cookies.userId exists and is valid
            }
        })

        return NextResponse.json(newComment, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: `error on /api/post/:id/comment (POST) ${error}` } , { status: 500 })

    }

}
