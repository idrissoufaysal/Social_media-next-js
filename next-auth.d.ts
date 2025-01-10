
// types/next-auth.d.ts

import "next-auth";
import "next-auth/jwt";
import { User } from "./app/types";

declare module "next-auth" {
    interface Session {
        user: User
    }
}

declare module "next-auth/jwt" {
    interface JWT extends User{
        id:string
    }
}
