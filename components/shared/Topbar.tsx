"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { useUsers } from "@/hooks/useUser";

export default  function Topbar() {
  const { user } = useUsers()

  return (
    <section className="topbar">
      <div className="flex-between px-4 py-5 items-center">
        <Link href="/" className="flex gap-3 items-center">
        <Image
            src={"/assets/images/b13m.png"}
            alt="logo"
            width={170}
            height={36}
            className="mb-[-45px] mt-[-40px] ml-[-50px] h-28 w-full"
          />
        </Link>
        <div className="flex gap-4">
          <SignOutButton>

            <Button
              variant="ghost"
              className="shad-button_ghost"

            >
              <Image
                src="assets/icons/logout.svg"
                alt="logout"
                width={30}
                height={40}
              />
            </Button>
          </SignOutButton>
          <Link href={"/profile/:id"} className="flex-center gap-3">
            <Image
              src={user?.image || "assets/icons/profile-placeholder.svg"}
              alt="profile"
              width={40}
              height={40}
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section >
  );
}
