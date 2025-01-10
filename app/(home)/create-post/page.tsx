import PostForm from '@/components/forms/PostForm'
import Image from 'next/image'
import React from 'react'

export default function CreatePost() {
  return (
    <div className='flex flex-1'>
      <div className="common-container">
        <div className="flex-start justify-start gap-3 max-w-5xl w-full">
          <Image
          src="/assets/icons/add-post.svg"
          height={36}
          width={36}
          alt='create-post'
          />
          <h2 className='h3-bold md:h2-bold text-left '>Create post</h2>
        </div>
        <PostForm/>
      </div>
    </div>
  )
}