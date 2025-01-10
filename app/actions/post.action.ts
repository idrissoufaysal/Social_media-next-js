import { getAuth } from "@/lib/authConfig";
import prisma from "@/lib/prisma";


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


export const toggleLike = async (postId: number) => {

    const session = await getAuth();
    const userId = session?.user.id;

    if (isNaN(postId)) {
        return { message: "Invalid post ID" }
    }

    try {
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