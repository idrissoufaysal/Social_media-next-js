/* eslint-disable @typescript-eslint/no-unused-vars */
// components/PostActions.tsx
"use client"; // Indique que ce composant est un Client Component

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Assurez-vous d'importer votre composant Button
import { useState } from "react";
import { DeleteAlertDialog } from "../containers/DeleteAlertDialog";
import { useToast } from "@/hooks/use-toast";
import { deletePost } from "@/actions/post.action";
import { useRouter } from "next/navigation";

interface PostActionsProps {
    postId: number;
    //   isAuthor: boolean;
    //   currentUserId: string;
    //   authorId: string;
}

export default function PostActions({
    postId,
}: PostActionsProps) {

    const [isDeleting, setisDeleting] = useState(false)
    const { toast } = useToast()
    const router=useRouter()

    // Fonction pour gérer la suppression du post
    const handleDelete = async () => {
        if (isDeleting) return
        try {
            setisDeleting(true)
            // Ajoutez ici la logique pour supprimer le post
            console.log("Deleting post with ID:", postId);
            // Exemple : await deletePost(postId);
            const res = await deletePost(postId)
            if(res){
                console.log(res.message);
                setisDeleting(false)
                toast({
                    title: "Success",
                    description: "Post deleted succesfully",
                })
                router.push('/')
            }

        } catch (error) {
            console.error("Failed to delete post:", error);
            toast({
                title: "Error",
                description: "Error while deleting",
            })
        } finally {
            setisDeleting(false);
        }
    };

    return (
        <div className={`flex-center gap-3`}>
            {/* Bouton Éditer */}
            <Link
                href={`/update-post/${postId}`}
                className={`post_details-delete_btn`}
            >
                <Image
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                />
            </Link>

            {/* Bouton Supprimer */}
            <DeleteAlertDialog isDeleting={isDeleting} onDelete={handleDelete} />
        </div>
    );
}