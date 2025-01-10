import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { loginValidation } from "@/lib/validations";
import { z } from "zod";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({
      error: "Method not allowed",
    });
  }

  const body = await req.json();
  const data = loginValidation.parse(body)
  try {
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new Error("Invalid credentials !!!");
    }

    return NextResponse.json(user, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.message);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
