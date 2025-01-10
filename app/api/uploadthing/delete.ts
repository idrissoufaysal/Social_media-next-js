import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi=new UTApi()
export const POST=async(req:NextRequest)=>{
   const {imageKey}=await req.json()

try {
      const res= await utapi.deleteFiles(imageKey);
      return NextResponse.json(res,{status:200})
    
} catch (error) {
    console.log(error);
    return NextResponse.json(error,{status:500})

}

}