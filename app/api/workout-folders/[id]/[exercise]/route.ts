import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

type DeleteParams = {
    params: {
        id: string
        exercise: string
    }
}

export async function DELETE(request: NextRequest, { params }: DeleteParams) {
    const token = await getToken({ req: request })

    if (token === null) {
        return NextResponse.json({
            data: "Unauthorized request"
        }, {status: 401})
    }

    const { id, exercise } = params

    try {
        const user = await prisma.user.findFirst({
            where: {
                id: token.id
            }
        })

        if (!user) {
            return NextResponse.json({
                data: "Requested user does not exist"
            }, {status: 400})
        }

        const workoutFolder = await prisma.workoutFolder.findFirst({
            where: {
                id: parseInt(id)
            }
        })

        if (!workoutFolder) {
            return NextResponse.json({
                data: "Requested folder does not exist"
            }, {status: 400})
        }

        const exerciseForDelete = await prisma.folderExercise.findFirst({
            where: {
                folderId: workoutFolder.id,
                exercise: exercise
            }
        })

        if (exerciseForDelete === null) {
            return NextResponse.json({
                data: "Exercises requested for deletion does not exist in current folder"
            }, {status: 400})
        }

        await prisma.folderExercise.delete({
            where: {
                exercise_folderId: {
                    folderId: exerciseForDelete.folderId,
                    exercise: exerciseForDelete.exercise
                }
            }
        })

        return NextResponse.json({}, {status: 200})
    } catch (e) {
        console.error(e)
        return NextResponse.json({}, {status: 500})
    }
}