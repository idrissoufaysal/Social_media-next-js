import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";


export const getPost=async()=>{

}

export async function syncUser() {
    try {
      const { userId } = await auth();
      const user = await currentUser();
  
      if (!userId || !user) return;
  
      const existingUser = await prisma.user.findUnique({
        where: {
          clerkId: userId,
        },
      });
  
      if (existingUser) return existingUser;
  
      const dbUser = await prisma.user.create({
        data: {
          clerkId: userId,
          name: `${user.firstName || ""} ${user.lastName || ""}`,
          username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
          email: user.emailAddresses[0].emailAddress,
          image: user.imageUrl,
          password:""
        },
      });
  
      return dbUser;
    } catch (error) {
      console.log("Error in syncUser", error);
    }
  }

  export async function getUserByClerkId(clerkId: string) {
    return prisma.user.findUnique({
      where: {
        clerkId,
      },
      include: {
        _count: {
          select: {
            followers: true,
            posts: true,
            followings:true
          },
        },
      },
    });
  }

  export async function getDbUserId() {
    const { userId: clerkId } = await auth();
    if (!clerkId) return null;
  
    const user = await getUserByClerkId(clerkId);
  
    if (!user) throw new Error("User not found");
  
    return user.id;
  }

  export async function getRandomUsers() {
    try {
      const userId = await getDbUserId();
  
      if (!userId) return [];
  
      // get 3 random users exclude ourselves & users that we already follow
      const randomUsers = await prisma.user.findMany({
        where: {
          AND: [
            { NOT: { id: userId } },
            {
              NOT: {
                followers: {
                  some: {
                    followerId: userId,
                  },
                },
              },
            },
          ],
        },
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          _count: {
            select: {
              followers: true,
            },
          },
        },
        take: 3,
      });
  
      return randomUsers;
    } catch (error) {
      console.log("Error fetching random users", error);
      return [];
    }
  }
  


export async function getCurrentUser() {
    const { userId } =await auth();
    if (!userId) return null;

    // Récupérez les détails de l'utilisateur depuis votre base de données
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    return user;
}