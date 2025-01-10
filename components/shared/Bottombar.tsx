"use client"
import { bottombarLinks } from '@/app/constants';
import { INavLink } from '@/app/types';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function Bottombar() {
  const pathname = usePathname();
  

  return (

    <section className='bottom-bar'>
      {bottombarLinks.map((link: INavLink) => {
                    const isActive=pathname===link.route

            return (
                <Link href={link.route} key={link.label} className={`${isActive && 'bg-primary-500 rounded-[10px]'} bottombar-link flex-center flex-col p-2 gap-1 transition`}>
                  <Image
                    src={link.imgURL}
                    alt={link.label}
                    width={16}
                    height={16}
                    className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                  />
                  <p className='tiny-medium text-light-2' >

                  {link.label}
                  </p>
                </Link>
            );
          })}
    </section>
  
  )
}
