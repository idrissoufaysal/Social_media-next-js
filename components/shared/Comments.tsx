"use client"
import { useState } from "react";
import { Posts } from "@/app/types";
import { multiFormatDateString } from "@/lib/utils";
import { SendIcon } from 'lucide-react';
import { Avatar } from '../ui/avatar';
import { AvatarImage } from '../ui/avatar';
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export default function Comments({ post }: { post: Posts[number] }) {

    const [newComment, setNewComment] = useState('')
    const [isCommenting, setIsCommenting] = useState(false)
    const { toast } = useToast()

    const { user } = useUser()

    const handleAddComment = async () => {
        if(isCommenting) return
        try {
            setIsCommenting(true)
           const res= await axios.post(`/api/post/${post.id}/comments`,{desc:newComment})
           console.log(res.data);
           if(res.data){
            toast({
                title: "Success",
                description: "comment add succesfully",
              })
              setIsCommenting(false)
              setNewComment('')
           }
        } catch (error) {
            console.log(error);
           throw new Error('someThing went wrong')
        }
        finally{
            setIsCommenting(false)
        }
    }


    return (
        <div className="space-y-4 pt-4 " onClick={(e) => { e.preventDefault, e.stopPropagation() }}>
            <hr className="border w-full border-dark-4/80" />
            <div className="space-y-4 max-h-28 overflow-scroll custom-scrollbar">
                {/* DISPLAY COMMENTS */}
                {post.comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                        <Avatar className="size-8 flex-shrink-0">
                            <AvatarImage src={comment.author.image ?? "/avatar.png"} />
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                <span className="base-medium text-light-2 lg:body-bold">
                                    @{comment.author.name}
                                </span>
                                <span className="text-sm text-muted-foreground">·</span>
                                <span className="subtle-semibold lg:small-regular text-light-3">
                                    {multiFormatDateString(comment.createdAt.toISOString())}
                                </span>
                            </div>
                            <p className="text-sm break-words">{comment.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            {user && (
                <div className="flex space-x-3">
                    <Avatar className="size-8 flex-shrink-0">
                        <AvatarImage src={user?.imageUrl || "/avatar.png"} />
                    </Avatar>
                    <div className="flex-1">
                        <Textarea
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="min-h-[80px] resize-none"
                        />
                        <div className="flex justify-end mt-2">
                            <Button
                                size="sm"
                                onClick={handleAddComment}
                                className="flex items-center gap-2 bg-white text-black"
                                disabled={!newComment.trim() || isCommenting}
                            >
                                {isCommenting ? (
                                    "Posting..."
                                ) : (
                                    <>
                                        <SendIcon className="size-4" />
                                        Comment
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    )
}
