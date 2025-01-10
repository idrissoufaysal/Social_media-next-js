import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {

    try {
        const post = await prisma.post.findMany(
            {
                orderBy: {
                    createdAt: "desc"
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                            image: true,
                            email: true
                        }
                    }, comments: {
                        orderBy:{createdAt:"asc"},
                        include: {
                            user: {
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
                _count:{
                    select:{
                        comments:true,
                        likes:true
                    }
                }
                }
            })

        return NextResponse.json(post, { status: 200 })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export const POST = async (req: NextRequest) => {
    const { desc, userId, img } = await req.json()

    try {
        const newPost = await prisma.post.create({ data: { desc, userId, img } })
        revalidatePath('/')
        return NextResponse.json({ Message: "Post add succefully", post: newPost }, { status: 200 })
    } catch (error) {
        console.log(error);

        if (error instanceof Error) {

            return NextResponse.json(
                {
                    error: error.message,
                },
                { status: 500 }
            );
        }
    }
}

export const PUT = async () => {

}