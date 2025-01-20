"use client";

import { Posts } from '@/app/types';
import Image from 'next/image';
import { useOptimistic, useState, useTransition } from 'react';
import { toggleFavorit, toggleLike } from '@/actions/post.action';

function PostStats({ post, userId }: { post: Posts[number]; userId?: string }) {
    const [hasLiked, setHasLiked] = useState(post.likes?.some((like) => like.userId === userId));
    const [likes, setLikes] = useState(post._count?.likes);
    const [optimisticLikes, setOptimisticLikes] = useState(post._count?.likes);

    const [hasFav, setHasFav] = useState(post.favorie?.some((fav) => fav.userId === userId));
    const [favs, setFavs] = useState(post._count?.favorie);




    // Utilisation de useTransition pour encapsuler la mise à jour optimiste
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isPending, startTransition] = useTransition();
    const [isPendingFavs, startTransitionFav] = useTransition();

    const handleLike = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        try {
            setHasLiked(!hasLiked)
            setOptimisticLikes(prev => prev + (hasLiked ? -1 : + 1))
           const result= await toggleLike(post.id)
           console.log(result);
           
        } catch (error) {
            setHasLiked(post.likes?.some((like) => like.userId === userId))
            setLikes(post._count?.likes)
        } finally {

        }
    };

    const handleFavorie = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        startTransitionFav(async () => {
            const res = await toggleFavorit(post?.id)
            console.log(res);
            if (res.status) {
                setHasFav(!hasFav)
                setFavs(hasFav ? prev => prev - 1 : prev => prev + 1)
            }
        })

    }
    return (
        <div className='flex justify-between items-center'>
            <div className="flex gap-2" onClick={handleLike}>
                <Image
                    src={hasLiked ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"} // Change l'icône en fonction de l'état
                    alt="like"
                    height={20}
                    width={20}

                    className='cursor-pointer' />

                <p className='small-medium lg:base-medium'>{optimisticLikes}</p>
            </div>
            <div className="flex gap-2" onClick={handleFavorie}>

                {isPendingFavs ? <Image src="/assets/icons/loader.svg"
                    alt='loader'
                    width={27}
                    height={27} /> : <><Image
                        src={hasFav ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'}
                        alt='favorite'
                        height={20}
                        width={20}

                        className='cursor-pointer'
                    />
                    <span> {favs}</span> </>
                }
            </div>
        </div >
    );
}

export default PostStats;