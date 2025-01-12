"use client";
import { useEffect, useState } from "react";
import { User } from "@/app/types"; // Assurez-vous que le chemin est correct
import axios from "axios";
import { useUser } from "@clerk/nextjs";

export const useUsers = () => {
    const [user, setUser] = useState<User | null>(null); // Initialisez avec null
    const [isAuth, setIsAuth] = useState(false);
    const { user:currentUser } = useUser();

    useEffect(() => {
        const fetchUser = async () => {
            if (currentUser?.id) { // Vérifiez si l'ID de l'utilisateur existe
                try {
                    const response = await axios.get(`/api/user/${currentUser.id}`);
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
    }, [currentUser?.id]); // Ne pas inclure `user` comme dépendance ici

    return {
        user,
        isAuth,
    };
};
