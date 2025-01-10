"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export default function Topbar() {
  return (
    <section className="topbar">
      <div className="flex-between px-4 py-5">
        <Link href="/" className="flex gap-3 items-center">
          <Image
            src="assets/images/logo.svg"
            alt="logo"
            width={130}
            height={320}
          />
        </Link>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => {
              console.log("logoutUser");
            }}
          >
            <Image
              src="assets/icons/logout.svg"
              alt="logout"
              width={30}
              height={40}
            />
          </Button>
          <Link href={"/profile/:id"} className="flex-center gap-3">
          <Image
              src="assets/icons/profile-placeholder.svg"
              alt="profile"
              width={40}
              height={40}
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
