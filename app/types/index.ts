import { getPosts } from "../actions/post.action";

export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
  };
  
  export type IUpdateUser = {
    userId: string;
    name: string;
    bio: string;
    imageId: string;
    imageUrl: URL | string;
    file: File[];
  };
  
  export type INewPost = {
    userId: string;
    description: string;
    file: File[];
  };

  export type IPost={
    userId: string;
    description: string;
    file?: File[];
    imageUrl:string
  }
  
  export type IUpdatePost = {
    postId: string;
    caption: string;
    imageId: string;
    imageUrl: URL;
    file: File[];
    location?: string;
    tags?: string;
  };
  
  export type IUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
    bio: string;
  };

  export type User = {
    id?:string
    name?: string;
    username?: string;
    email?: string;
    emailVerified?: Date;
    image?: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    lastLogin?: Date;
    avatar?: string;
    cover?: string;
    surname?: string;
    description?: string;
    city?: string;
    school?: string;
    work?: string;
    website?: string;
  };
  
  
  export type INewUser = {
    name: string;
    email: string;
    username: string;
    password: string;
  };

 export interface Like {
    id: number;
    createdAt: string;
    userId: string;
    postId?: number;
    commentId?: number;
  }
  
 export interface Comment {
    id: number;
    desc: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    postId: number;
    likes: Like[];
  }
  
 export interface Post {
    id: number;
    desc: string;
    img?: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    user: User;
    comments: Comment[];
    likes: Like[];
  }
  

  // Type personnalisé pour exclure le champ `password` et ne garder que les informations nécessaires du User.
type SafeUser = Omit<User, "password">;

// Type pour représenter un Post avec ses relations inclues.
export type UserPost = Post & {
  user: SafeUser; // Inclure l'utilisateur avec les champs autorisés seulement.
  comments: Comment[];
  likes: Like[];
};


export type Posts=Awaited<ReturnType<typeof getPosts>>


