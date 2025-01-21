"use client"

import { useState } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Posts } from "@/app/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Comments({post,userId,open}:{post?: Posts[number]; userId?: string,open?:boolean }) {
    const [comments, setComments] = useState(post._count?.comments);

  return (
    <div className="w-full flex flex-col">
       <div className="flex justify-between gap-5">
          <Image src={post?.user?.image as string} className="size-10 rounded-full"  width={50} height={50} alt="profile image"/>
          <Input className="border-none border-b-2"/>
          <Button variant={"outline"}>send</Button>
       </div>
       
    </div>
  )
}
