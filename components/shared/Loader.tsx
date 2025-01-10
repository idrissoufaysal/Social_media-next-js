import Image from 'next/image'
import React from 'react'

export default function Loader() {
  return (
    <div className='flex-center w-full'>
        <Image src="/assets/icons/loader.svg"
        alt='loader'
        width={27}
        height={27} />
    </div>
  )
}
