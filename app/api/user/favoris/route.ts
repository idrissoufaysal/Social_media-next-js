import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
const {searchParams}=new URL(req.url)
const userId = searchParams.get("userId")
 // const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ message: "User ID is required" }, { status: 400 });
  }
  try {
    const userFav = await prisma.favorie.findMany({
      where: {
        userId
      },
      include: {
       post:true
      }  // Include the user in the query result.
    })

    const favorie=userFav.map(f=>f.post)

    return NextResponse.json(favorie, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 404 });
  }

}

export const POST=async(req:NextRequest)=>{
  const {userId,postId}=await req.json()
  try {
          await prisma.favorie.create({
            data: {
              userId,
              postId
            }
          })
          return NextResponse.json({ message: "Post added to favorites" }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }

}

export const DELETE=async(req:NextRequest)=>{
  const {userId,postId}=await req.json()

  if (!userId ||!postId) {
    return NextResponse.json({ message: "User ID or Post ID is required" }, { status: 400 });
  }
  
  try {
          await prisma.favorie.deleteMany({
            where: {
              userId,
              postId
            }
          })
          return NextResponse.json({ message: "Post removed from favorites" }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}
