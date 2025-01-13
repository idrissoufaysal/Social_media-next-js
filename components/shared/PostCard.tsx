import Image from 'next/image'
import React from 'react'
import { Posts } from '@/app/types'
import { multiFormatDateString } from '@/lib/utils';
import PostStats from './PostFeed';
import { getDbUserId } from '@/actions/user.action';

async function PostCard({ props }: { props?: Posts[number] }) {
   const userId=await getDbUserId()
    return (
        <div className='post-card mt-4'>
            <div className="flex-between">
                <div className="flex items-center gap-3">
                    <Image
                        src={props?.user?.image || '/assets/icons/profile-placeholder.svg'}
                        alt='profileImage'
                        width={50}
                        height={50}
                        className='rounded-full size-10 lg:h-12 lg:w-12'
                    />
                    <div className="flex flex-col">
                        <span className='base-medium text-light-1 lg:body-bold '>{props?.user.name} </span>
                        <span className='subtle-semibold lg:small-regular text-light-3'>{multiFormatDateString(props?.createdAt.toISOString())} </span>
                    </div>
                </div>
            </div>
            <p className='mt-2'>
                {props?.desc}
            </p>
            <Image
                alt='post image'
                src={props?.img || '/assets/images/js.jpeg'}
                height={206}
                width={300}
                className='post-card_img mt-5 object-cover'
            />
            <PostStats post={props!} userId={userId || ''}/>
        </div>
    )
}

export default PostCard
