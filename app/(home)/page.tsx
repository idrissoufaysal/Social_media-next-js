import PostCard from "@/components/shared/containers/PostCard";
import Link from "next/link";
import React from "react";
import { Posts } from "../types";
import { SignIn } from "@clerk/nextjs";
import { getPosts } from "../../actions/post.action";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "../../actions/user.action";

export default async function HomePage() {
  const data = await getPosts()
  const user = await currentUser();
  if (user) await syncUser()

  if (!user) {
    return <div className="flex items-center justify-center ml-20">
      <SignIn />
    </div>
  }
  console.log(user);



  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full"> Home Feed</h2>
          {
            (
              data && data?.map((item: Posts[number]) => (
                <Link href={`/post/${item.id}`} key={item.id}>
                  <PostCard props={item} />    
                </Link>
              ))
            )
          }
        </div>
      </div>
    </div>
  );
}
