/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Posts } from '@/app/types'
import Image from 'next/image'
import Loader from './Loader'
import { useOptimistic, useState, useTransition } from 'react'
import { toggleLike } from '@/app/actions/post.action'
import { useUser } from '@clerk/nextjs'

function PostStats({ post, userId }: { post: Posts[number], userId?: string }) {
    const { user } = useUser();

    const [isCommenting, setisCommenting] = useState(false)
    const [hasLiked, setisHasLiked] = useState(post.likes?.some((like) => like.userId === user?.id))
    const [isliking, setisLiking] = useState(false)
    const [likes, setlikes] = useState(post._count?.likes)

     // Utilisation de useOptimistic pour gérer l'état optimiste
     const [optimisticState, setOptimisticState] = useOptimistic(
        { likes, hasLiked }, // État initial
        (state, action: "like" | "unlike") => {
            // Fonction de réduction pour mettre à jour l'état optimiste
            if (action === "like") {
                return { likes: state.likes + 1, hasLiked: true };
            } else {
                return { likes: state.likes - 1, hasLiked: false };
            }
        }
    );

    const handleLike = async () => {
        // Détermine l'action à effectuer (like ou unlike)
        const action = optimisticState.hasLiked ? "unlike" : "like";

        // Met à jour l'état optimiste immédiatement
        setOptimisticState(action);

        // Appelle la Server Action pour mettre à jour la base de données
        const result = await toggleLike(post.id);

        // Si la Server Action échoue, annuler l'état optimiste
        if (!result || result.message === "Internal server error") {
            setOptimisticState(optimisticState.hasLiked ? "like" : "unlike"); // Annule l'état optimiste
        }
    };

    return (
        <div className='flex justify-between items-center'>

            <div className="flex gap-2">
            <Image
                    src={optimisticState.hasLiked ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"} // Change l'icône en fonction de l'état
                    alt="like"
                    height={20}
                    width={20}
                    onClick={handleLike}
                    className="cursor-pointer"
                />
                <p className='small-medium lg:base-medium'>{optimisticState.likes}</p>
            </div>
            <div className="flex gap-2">
                <Image
                    src={'/assets/icons/save.svg'}
                    alt='favorite'
                    height={20}
                    width={20}
                    onClick={() => { }}
                    className='cursor-pointer'

                />

            </div>

        </div>
    )
}

export default PostStats
