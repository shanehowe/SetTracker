import prisma from "@/lib/prisma";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";

type SignUpData = {
    email: string
    username: string
    password: string
}

export async function POST(request: Request) {
    const body: SignUpData = await request.json()
    const { email, username, password } = body

    let existingUser = await prisma.user.findFirst({
        where: { email }
    })

    if (existingUser) {
        return NextResponse.json(
            { message: "Email already in use" },
            { status: 400 }
        )
    }

    existingUser = await prisma.user.findFirst({
        where: { username }
    })

    if (existingUser) {
        return NextResponse.json(
            { message: "Username already in use" },
            { status: 400 }
        )
    }

    const SALT_ROUNDS = 12
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
        data: { username, email, passwordHash }
    })

    const userWithoutPassword = exclude(user, ["passwordHash"])

    return NextResponse.json(
        { data: userWithoutPassword },
        { status: 200 }
    )
}

function exclude<User, Key extends keyof User>(
    user: User,
    keys: Key[]
  ): Omit<User, Key> {
    for (let key of keys) {
      delete user[key]
    }
    return user
  }