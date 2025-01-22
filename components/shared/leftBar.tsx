"use client";
import { sidebarLinks } from "@/app/constants";
import { INavLink } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { useUsers } from "@/hooks/useUser";
export default function LeftBar() {
  const pathname = usePathname();
  const { user } = useUsers()
  console.log(pathname);


  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-7">
        <Link href="/" className="flex gap-3 items-center">
          <Image
            src={"/assets/images/b13m.png"}
            alt="logo"
            width={170}
            height={36}
            className="mb-[-45px] mt-[-40px] ml-[-50px] h-28 w-full"
          />
        </Link>

        <Link href="/profile/:id" className="flex gap-3 items-center">
          <Image
            src={user?.image || "assets/icons/profile-placeholder.svg"}
            alt="profile"
            width={40}
            height={40}
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">JsMastery</p>
            <p className="small-regular text-light-3">{`${user?.name || "@username"} `}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-3">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route
            return (
              <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
                <Link href={link.route} className="flex gap-4 items-center py-3 px-4">
                  <Image
                    src={link.imgURL}
                    alt={link.label}
                    width={20}
                    height={10}
                    className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                  />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <SignOutButton>
        <Button
          variant="ghost"
          className="shad-button_ghost mt-10"
        // onClick={handleLogout}
        >
          <Image
            src="assets/icons/logout.svg"
            alt="logout"
            width={20}
            height={30}
          />
          <p className="small-medium lg:base-medium">Logout</p>
        </Button>
      </SignOutButton>
    </nav >
  );
}
