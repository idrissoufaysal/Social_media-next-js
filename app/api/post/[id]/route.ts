import { getDbUserId } from "@/actions/user.action";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const postId = parseInt(params.id);

    if (isNaN(postId)) {
        // Si l'ID n'est pas un nombre valide
        return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
    }

    try {
        const existingPost = await prisma.post.findUnique({
            where: { id: postId }, include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        image: true,
                        email: true
                    }
                }, comments: {
                    orderBy: { createdAt: "asc" },
                    include: {
                        author: {
                            select: {
                                id: true, name: true, image: true
                            }
                        }
                    }
                }, likes: {
                    select: {
                        userId: true

                    },


                },
                _count: {
                    select: {
                        comments: true,
                        likes: true
                    }
                }
            }
        })

        if (!existingPost) {
            return NextResponse.json({ message: "post not found" }, { status: 404 });
        }

        return NextResponse.json(existingPost, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred in /api/post/:id (GET)" }, { status: 404 });
    }

}


export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const postId = parseInt(params.id);

    if (isNaN(postId)) {
        // Si l'ID n'est pas un nombre valide
        return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
    }

    const { userId, desc, img } = await req.json();

    try {
        const existingPost = await prisma.post.findFirst({ where: { id: postId } })

        if (!existingPost) {
            return NextResponse.json({ message: "post not found" }, { status: 404 });
        }
        if (existingPost.authorId != userId) {
            return NextResponse.json({ message: " you are not authorize" }, { status: 404 });

        }
        const updatedPost = await prisma.post.update({
            where: { id: existingPost.id },
            data: {
                authorId: existingPost.authorId,
                desc: desc || existingPost.desc,
                img: img || existingPost.img,
            }
        });

        return NextResponse.json(updatedPost, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred in /api/post/:id (PUT)" }, { status: 500 });
    }
}


export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const postId = parseInt(params.id);

    if (isNaN(postId)) {
        // Si l'ID n'est pas un nombre valide
        return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
    }

    try {
        const userId=await getDbUserId()

        const existingPost = await prisma.post.findFirst({ where: { id: postId } })

        if (!existingPost) {
            return NextResponse.json({ message: "post not found" }, { status: 404 });
        }
        if (existingPost.authorId != userId) {
            return NextResponse.json({ message: " you are not authorize" }, { status: 404 });
        }
        await prisma.post.delete({
            where: { id: existingPost.id },
        })
        revalidatePath('/')
        redirect('/')
        return NextResponse.json({ message: "Post deleted succefully" }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred in /api/post/:id (DELETE)" }, { status: 500 });
    }
}