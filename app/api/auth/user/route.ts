import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    if (req.method !== "GET") {
        return NextResponse.json({
            error: "method not allowed",
        }, { status: 500 });
    }

    const session = await getSession();
    
    if (!session) {
        return NextResponse.json({
            message: "no session",
            ok:false
        }, { status: 201 });
    }
    const user = await prisma.user.findFirst({ where: { email: session.user?.email } })
    return NextResponse.json({
        user
    }, { status: 200 });

}