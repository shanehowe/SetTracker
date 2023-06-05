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

    const folderId = parseInt(params.id)
    
    if (isNaN(folderId)) {
        return NextResponse.json({
            data: "Folder id param must be a valid integer"
        })
    }

    try {
        const workoutFolder = await prisma.workoutFolder.findFirst({
            where: {
                id: folderId,
                userId: token.id
            }
        })
    
        if (!workoutFolder) {
            return NextResponse.json({
                data: "Requested folder does not exist"
            }, {status: 400})
        }
    
        const folderExercises = await prisma.folderExercise.findMany({
            where: {
                folderId,
            }
        })
    
        return NextResponse.json({
            data: {
                folderExercises,
                folderName: workoutFolder.folderName,
                folderId: workoutFolder.id
            }
        }, {status: 200})
    } catch (e) {
        return NextResponse.json({}, {status: 500})
    }
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

    if (isNaN(folderId)) {
        return NextResponse.json({
            data: "Folder id param must be a valid integer"
        })
    }

    try {
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
    } catch(e) {
        return NextResponse.json({}, {status: 500})
    }
}