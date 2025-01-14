/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image'
import { Posts } from "@/app/types";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { multiFormatDateString } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import PostStats from '@/components/shared/PostFeed';
import { getPostById } from '@/actions/post.action';
import { getDbUserId } from '@/actions/user.action';
import { Suspense } from 'react';


const PostDetails =async ({ params }: { params: { id: string } }) => {
  const postId = parseInt(params.id)
  const post = await getPostById(postId);

  const currentUserId = await getDbUserId();

    const isAuthor = currentUserId === post;
  // const { data: post, isPending } = useQuery(
  //   {
  //     queryKey: ["get_post", postId],
  //     queryFn: async () => {
  //       try {
  //         const response = await axios.get(`/api/post/${postId}`)
  //         const u = await axios.get("/api/user/getUserId")
  //         setcurrentUserId(u.data)
  //         return response.data as Posts[number];
  //       } catch (error) {
  //         console.error(error);
  //         throw error;
  //       } finally {
  //       }
  //     },
  //   }
  // );


  return (
    <div className="post_details-container">
      <Suspense fallback={<Loader/>}>
      <div className="md:flex max-w-5xl w-full">
        <Button
          variant="ghost"
          className="shad-button_ghost">
          <Image
            src={"/assets/icons/back.svg"}
            alt="back"
            width={24}
            height={24}
          />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>

      {!post ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <Image
            src={post?.img || ""}
            alt="post image"
            className="post_details-img"
            height={500}
            width={500}
          />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                href={`/profile/${post?.user?.id}`}
                className="flex items-center gap-3">
                <Image
                  src={
                    post?.user?.image ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                  width={200}
                  height={200}
                />
                <div className="flex gap-1 flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.user?.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular ">
                      {multiFormatDateString(post?.createdAt)}
                    </p>
                    •
                  </div>
                </div>
              </Link>

              <div className={`flex-center gap-4 ${currentUserId !== post?.authorId && "hidden"}`}>
                {/* <Link
                  href={`/update-post/${post?.id}`}
                  className={`post_details-delete_btn hidden ${currentUserId !== post?.authorId && "hidden"}`}>
                  <Image
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link> */}

                <Button
                  variant="ghost"
                  size={'icon'}
                  className={`post_details-delete_btn hidden ${currentUserId !== post?.authorId && "hidden"
                    }`}>
                  <Image
                    src={"/assets/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.desc}</p>
              {/* <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string, index: string) => (
                  <li
                    key={`${tag}${index}`}
                    className="text-light-3 small-regular">
                    #{tag}
                  </li>
                ))}
              </ul> */}
            </div>

            <div className="w-full">
              <PostStats post={post! || {}} userId={currentUserId || ''} />
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl">
        <hr className="border w-full border-dark-4/80" />

        <h3 className="body-bold md:h3-bold w-full my-10">
          More Related Posts
        </h3>
        {/* {isUserPostLoading || !relatedPosts ? (
          <Loader />
        ) : (
          <GridPostList posts={relatedPosts} />
        )} */}
      </div>
      </Suspense>
    </div>
  );
};

export default PostDetails;