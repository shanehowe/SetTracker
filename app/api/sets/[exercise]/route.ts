import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

type GetParams = {
    params: {
        exercise: string
    }
}

export async function GET(request: NextRequest, { params }: GetParams) {
    const token = await getToken({req: request})
    if (!token) {
        return NextResponse.json({
            data: "Unauthorized"
        }, {status: 400})
    }

    const userId = token.id
    const exercise = params.exercise

    try {
        const isValidExercise = await prisma.exercise.findFirst({
            where: {
                name: exercise
            }
        })

        if (!isValidExercise) {
            return NextResponse.json({
                data: "Requested sets for an exercise that does not exist"
            }, { status: 400 })
        }

        const sets = await prisma.set.findMany({
            where: {
                userId,
                exercise
            },
            take: 150
        })

        const groupedSets = sets.reduce((result: any, set) => {
            const date = set.createdAt.toISOString().split("T")[0]
            if (result[date]) {
                result[date].push(set)
            } else {
                result[date] = [set]
            }
            return result
        }, {})

        return NextResponse.json({
            data: groupedSets
        }, { status: 200 })

    } catch(e) {
        console.error(e)
        return NextResponse.json({}, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    const token = await getToken({req: request})
    if (!token) {
        return NextResponse.json({
            "data": "Unauthorized"
        }, {status: 400})
    }

    const userId = token.id
    const body: WeightSet = await request.json()

    try {
        const createdSet = await prisma.set.create({
            data: {
                userId,
                exercise: body.exercise,
                reps: body.reps,
                weight: body.weight
            }
        })

        return NextResponse.json({
            data: createdSet
        }, { status: 200 })

    } catch (e) {
        return NextResponse.json({}, { status: 200 })
    }
}

export async function DELETE(request: NextRequest) {

}

export async function PUT(request: NextRequest) {

}