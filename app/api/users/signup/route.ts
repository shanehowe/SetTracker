import prisma from "@/lib/prisma";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";

type SignUpData = {
    username?: string
    password?: string
}

export async function POST(request: Request) {
    const body: SignUpData = await request.json()
    const { username, password } = body

    if (!username || !password) {
        return NextResponse.json({
            error: "Missing values"
        }, { status: 400 })
    }

    try {
        let existingUser = await prisma.user.findFirst({
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
            data: { username, passwordHash }
        })
    
        const userWithoutPassword = exclude(user, ["passwordHash"])
    
        return NextResponse.json(
            { data: userWithoutPassword },
            { status: 200 }
        )
    } catch(e) {
        console.error(e)
        return NextResponse.json({}, { status: 500 })
    }
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