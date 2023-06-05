import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: {params: {id: string}}) {
    const token = await getToken({req: request})
    if (!token) {
        return NextResponse.json({
            data: "Unauthorized"
        }, { status: 401 })
    }

    // TODO: Get the exercises linked the folder and return them
}

export async function DELETE(request: NextRequest, { params }: {params: {id: string}}) {
    const token = await getToken({ req: request })
    if (!token) {
        return NextResponse.json({
            data: "Unauthorized"
        }, { status: 401 })
    }

    const userId = token.id
    if (!Number.isInteger(params.id)) {
        return NextResponse.json({
            data: "Folder param must be an integer"
        }, {status: 400})
    }

    const folderId = parseInt(params.id)

    const workoutFolder = await prisma.workoutFolder.findFirst({
        where: {
            id: folderId
        }
    })

    if (!workoutFolder) {
        return NextResponse.json({
            data: "Folder does not exist"
        }, {status: 400})
    }

    if (workoutFolder.userId !== userId) {
        return NextResponse.json({
            data: "Unauthorized, only the owner of this folder may delete it"
        }, {status: 401})
    }

    await prisma.workoutFolder.delete({
        where: {
            id: folderId
        }
    })
    
    return NextResponse.json({}, {status: 200})
}