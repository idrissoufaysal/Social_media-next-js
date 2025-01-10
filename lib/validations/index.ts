import { z } from "zod";

export const registerValidation = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters",
  }),
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

export const loginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

export const newPostSchema = z.object({
  userId: z.string(),// Valide que userId est une chaîne non vide
  desc: z.string().min(5, { message: "Description is required" }), // Valide que description est une chaîne non vide
  file: z.custom<File[]>()
});