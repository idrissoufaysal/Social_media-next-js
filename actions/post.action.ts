"use server";
import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";


export const getPosts = async () => {
    try {
        const posts = await prisma.post.findMany(
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

        return posts;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
        console.log(error)
        throw new Error("Failed fetching posts")
    }
}

export const createNewPost = async ( img: string,desc: string) => {

    const userId = await getDbUserId();
    if (userId == null) return

    try {
        const newPost = await prisma.post.create({ data: { desc, img, authorId: userId } })
        revalidatePath('/')
        return { success:true, post: newPost }
    } catch (error) {
        console.log(error);

        console.error("Failed to create post:", error);
        return { success: false, error: "Failed to create post" };


    }
}



export const toggleLike = async (postId: number) => {

    if (isNaN(postId)) {
        return { message: "Invalid post ID" }
    }

    try {
        const userId  = await getDbUserId()
        if (!userId) {
            return { message: 'User not authenticated' }
        }

        // Vérifiez que l'utilisateur existe
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return { message: 'User not found' }
        }

        // Vérifiez que le post existe
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return { error: "Post not found" }
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
            return { message: 'liked' }

        } else {
            // Supprime le like si déjà présent (unlike)
            await prisma.like.delete({
                where: { id: existingLike.id },
            });
            return { message: 'removed' }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Error in POST /api/post/:id/like:', error.message);
        return { message: 'Internal server error', error: error.message }
    }

}