import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    const token = await getToken({req: request})
    if (!token) {
        return NextResponse.json(
            {
                "data": "Unauthorized"
            },
            {status: 400}
        )
    }

    try {
        const { email, username } = token
        if (!email || !username) {
            return NextResponse.json(
                {"data": "Missing credentails"},
                {status: 400}
            )
        }

        const user = await prisma.user.findFirstOrThrow({
            where: {
                email,
                username
            }
        })
        
        const workoutFolders = await prisma.workoutFolder.findMany({
            where: {
                userId: user.id
            }
        })

        return NextResponse.json({
            data: workoutFolders
        }, {status: 200})

    } catch(e) {
        return NextResponse.json({}, {status: 500})
    }
}

type PostBody = {
    folderName?: string
    linkedExercises?: string[]
}

export async function POST(request: NextRequest) {
    const token = await getToken({req: request})
    if (!token) {
        return NextResponse.json(
            {
                "data": "Unauthorized"
            },
            {status: 400}
        )
    }

    const { email, username } = token
    if (!email || !username) {
        return NextResponse.json(
            {"data": "Missing credentails"},
            {status: 400}
        )
    }

    const body: PostBody = await request.json()
    const { folderName, linkedExercises } = body

    if (!folderName) {
        return NextResponse.json({
            "data": "Folder name cannot be blank"
        }, { status: 400 })
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                email,
                username
            }
        })
        if (!user) {
            return NextResponse.json({
                "data": "Folder must be tied to a user"
            }, { status: 500 })
        }

        const createdFolder = await prisma.workoutFolder.create({
            data: {
                folderName,
                userId: user.id
            }
        })
        
        if (linkedExercises) {
            const exercisesWithFolder = linkedExercises.map((e) => {
                return {folderId: createdFolder.id, exercise: e}
            })

            exercisesWithFolder.forEach(async (obj) => {
                await prisma.folderExercise.create({
                    data: obj
                })
            })
        }

        return NextResponse.json({
            "data": createdFolder
        }, {status: 200})

    } catch(e) {
        return NextResponse.json({}, {status: 500})
    }
}