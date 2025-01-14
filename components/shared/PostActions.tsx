// components/PostActions.tsx
"use client"; // Indique que ce composant est un Client Component

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Assurez-vous d'importer votre composant Button

interface PostActionsProps {
    postId: number;
    //   isAuthor: boolean;
    //   currentUserId: string;
    //   authorId: string;
}

export default function PostActions({
    postId,
}: PostActionsProps) {
    // Fonction pour gérer la suppression du post
    const handleDelete = async () => {

        try {
            // Ajoutez ici la logique pour supprimer le post
            console.log("Deleting post with ID:", postId);
            // Exemple : await deletePost(postId);
        } catch (error) {
            console.error("Failed to delete post:", error);

        }
    };

    return (
        <div className={`flex-center gap-4`}>
            {/* Bouton Éditer */}
            <Link
                href={`/update-post/${postId}`}
                className={`post_details-delete_btn hidden`}
            >
                <Image
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                />
            </Link>

            {/* Bouton Supprimer */}
            <Button
                variant="ghost"
                size={"icon"}
                className={`post_details-delete_btn hidden`}
                onClick={handleDelete}
            >
                <Image
                    src={"/assets/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                />
            </Button>
        </div>
    );
}