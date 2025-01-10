"use client";
import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useQuery } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Posts } from "../types";

export default function HomePage() {

  const { isPending, error, data } = useQuery({
    queryKey: ['allPost'],
    queryFn: async () => {
      try {
        const response = await fetch("/api/post");
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        console.log("Données reçues:", result);
        return result;
      } catch (err) {
        console.error("Erreur lors de la récupération des posts:", err);
        throw err;
      }
    },
  })

  if (error) {
    console.error("Erreur de requête:", error);
    return <div className="text-center text-red-500">Une erreur est survenue lors du chargement des posts</div>;
  }

  return (
    <SessionProvider>
      <div className="flex flex-1">
        <div className="home-container">
          <div className="home-posts">
            <h2 className="h3-bold md:h2-bold text-left w-full"> Home Feed</h2>
            {
              isPending ? (
                <div className="mt-28">
                  <Loader />
                </div>
              ) : (
                data && data?.map((item: Posts[number]) => (
                  <Link href={`/${item.id}`} key={item.id}>
                    <PostCard props={item} />
                  </Link>
                ))
              )
            }
          </div>
        </div>
      </div>
    </SessionProvider>

  );
}
