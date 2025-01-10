"use client";
import { useEffect, useState } from "react";
import { User } from "@/app/types"; // Assurez-vous que le chemin est correct
import axios from "axios";
import { useSession } from "next-auth/react";

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null); // Initialisez avec null
    const [isAuth, setIsAuth] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchUser = async () => {
            if (session?.user?.id) { // Vérifiez si l'ID de l'utilisateur existe
                try {
                    const response = await axios.get(`/api/user/${session.user.id}`);
                    if (response.status === 200) {
                        setIsAuth(true);
                        setUser(response.data);
                    }
                } catch (error) {
                    console.error("Error fetching user:", error);
                    setIsAuth(false); // Gérer l'échec de la requête
                }
            } else {
                setIsAuth(false); // Mettre à jour l'authentification si la session n'est pas disponible
            }
        };

        fetchUser();
    }, [session?.user?.id]); // Ne pas inclure `user` comme dépendance ici

    return {
        user,
        isAuth,
    };
};
