import Image from 'next/image'
import React from 'react'
import { Posts } from '@/app/types'
import { multiFormatDateString } from '@/lib/utils';
import PostStats from './PostFeed';

function PostCard({ props }: { props?: Posts[number] }) {
   
    return (
        <div className='post-card mt-4'>
            <div className="flex-between">
                <div className="flex items-center gap-3">
                    <Image
                        src={props?.user?.image || '/assets/icons/profile-placeholder.svg'}
                        alt='profileImage'
                        width={38}
                        height={50}
                        className='rounded-full lg:h-12'
                    />
                    <div className="flex flex-col">
                        <span className='base-medium text-light-1 lg:body-bold '>{props?.user.name} </span>
                        <span className='subtle-semibold lg:small-regular text-light-3'>{multiFormatDateString(props?.createdAt)} </span>
                    </div>
                </div>
            </div>
            <p className='mt-2'>
                {props?.desc}
            </p>
            <Image
                alt='post image'
                src={props?.img || '/assets/images/js.jpeg'}
                height={56}
                width={300}
                className='post-card_img mt-5 object-cover'
            />
            <PostStats post={props!} />
        </div>
    )
}

export default PostCard
