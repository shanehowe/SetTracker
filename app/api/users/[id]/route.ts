import prisma from "@/lib/prisma"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {

}

type DeleteParams = {
    params: {
        id: string
    }
}

export async function DELETE(request: NextRequest, { params }: DeleteParams) {
    const token = await getToken({req: request})
    if (!token) {
        return NextResponse.json({
            data: "Unauthorized"
        }, { status: 401 })
    }

    const userId = token.id
    const idFromUrl = params.id

    if (userId !== parseInt(idFromUrl)) {
        return NextResponse.json({
            data: "Only the account owner can do this action"
        }, { status: 401 })
    }

    try {
        await prisma.user.delete({
            where: {
                id: userId
            }
        })

        return NextResponse.json({}, { status: 200 })
    } catch(e) {
        console.error(e)
        return NextResponse.json({}, { status: 500 })
    }
}