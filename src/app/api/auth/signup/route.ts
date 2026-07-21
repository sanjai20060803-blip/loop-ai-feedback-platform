import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      password,
      role,
    } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and password are required",
        },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 }
      );
    }


    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    const workspaceSlug = `${name}-${Date.now()}`
  .toLowerCase()
  .replace(/\s+/g, "-");


const workspace = await prisma.workspace.create({
  data: {
    name: `${name}'s Workspace`,
    slug: workspaceSlug,
  },
});


const user = await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword,
    role: role || "VIEWER",

    workspace: {
      connect: {
        id: workspace.id,
      },
    },
  },
});


    return NextResponse.json({
      success: true,
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Signup failed",
      },
      { status: 500 }
    );
  }
}