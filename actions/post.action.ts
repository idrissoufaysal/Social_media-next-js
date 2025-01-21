"use server";
import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


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
                        },
                        
                    },
                    favorie:{

                    }
                    ,comments: {
                        orderBy: { createdAt: "desc" },
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
                            likes: true,
                            favorie:true
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

export const createNewPost = async (img: string, desc: string) => {

    const userId = await getDbUserId();
    if (userId == null) return

    try {
        const newPost = await prisma.post.create({ data: { desc, img, authorId: userId } })
        revalidatePath('/')
        return { success: true, post: newPost }
    } catch (error) {
        console.log(error);

        console.error("Failed to create post:", error);
        return { success: false, error: "Failed to create post" };


    }
}

export const getPostById = async (postId: number) => {
    if (isNaN(postId)) {
        // Si l'ID n'est pas un nombre valide
        redirect('/not-found');
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
                    orderBy: { createdAt: "desc" },
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
                favorie:{
                    
                },
                _count: {
                    select: {
                        comments: true,
                        likes: true,
                        favorie:true
                    }
                }
            }
        })

        if (!existingPost) {
            redirect('/not-found');
        }

        return existingPost

    } catch (error) {
        console.log(error);
        throw new Error("An error occurred in /api/post/:id (GET)")
    }
}


export const toggleLike = async (postId: number) => {

    if (isNaN(postId)) {
        return { message: "Invalid post ID", status: false }
    }

    try {
        const userId = await getDbUserId()
        if (!userId) {
            return { message: 'User not authenticated', status: false }
        }

        // Vérifiez que l'utilisateur existe
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return { message: 'User not found', status: false }
        }

        // Vérifiez que le post existe
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return { message: "Post not found", status: false }
        }

        const countLike=await prisma.like.count()
        console.log(countLike);
        
        
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
            revalidatePath('/')
            revalidatePath(`/post/${postId}`);

            return { message: 'liked', status: true,likes:countLike,hasLiked:true }

        } else {
            // Supprime le like si déjà présent (unlike)
            await prisma.like.delete({
                where: { id: existingLike.id },
            });
            revalidatePath('/')
            revalidatePath(`/post/${postId}`);
            return { message: 'removed', status: true,likes:countLike,hasLiked:false }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Error in POST /api/post/:id/like:', error.message);
        return { message: 'Internal server error', error: error.message, status: false }
    }

}

export const toggleFavorit=async(postId:number)=>{
    if (isNaN(postId)) {
        return { message: "Invalid post ID", status: false }
    }

    try {
        const userId = await getDbUserId()
        if (!userId) {
            return { message: 'User not authenticated', status: false }
        }

        // Vérifiez que l'utilisateur existe
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return { message: 'User not found', status: false }
        }

        // Vérifiez que le post existe
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return { message: "Post not found", status: false }
        }

        const countFavorie=await prisma.favorie.count({where:{postId}})
        console.log(countFavorie);
        
        
        // Vérifiez si le favorie existe déjà
        const existingFav = await prisma.favorie.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId
                },
            },
        });

        if (!existingFav) {
            // Ajoute un Favorie
            await prisma.favorie.create({
                data: {
                    userId,
                    postId
                },
            });
            revalidatePath(`/post/${postId}`);
            revalidatePath('/')
            return { message: 'add', status: true,favories:countFavorie,hasFav:true }

        } else {
            // Supprime le favorie si déjà présent (unFavorie)
            await prisma.favorie.delete({
                where: { id: existingFav.id },
            });
            revalidatePath(`/post/${postId}`);
            revalidatePath('/')
            return { message: 'removed', status: true,favories:countFavorie,hasFav:false }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Error in POST /api/post/:id/like:', error.message);
        return { message: 'Internal server error', error: error.message, status: false }
    }
}


