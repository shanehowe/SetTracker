import prisma from "@/lib/prisma";
import { sortGroupedSetsByDate } from "@/lib/sets";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

type UrlParams = {
    params: {
        exercise: string
    }
}

export async function GET(request: NextRequest, { params }: UrlParams) {
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

        const groupedSetsObj = sets.reduce((result: any, set) => {
            const date = set.createdAt.toISOString().split("T")[0]
            if (result[date]) {
                result[date].push(set)
            } else {
                result[date] = [set]
            }
            return result
        }, {})

        const groupedSets: GroupedSet[] = []
        for (const [key, value] of Object.entries(groupedSetsObj)) {
            // @ts-ignore
            groupedSets.push({ date: key, sets: value })
        }

        sortGroupedSetsByDate(groupedSets)

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

    if (!(body.exercise && body.reps && body.weight)) {
        return NextResponse.json({
            data: "Missing fields, exercise or reps or weight"
        }, { status: 400 })
    }

    try {
        const createdSet = await prisma.set.create({
            data: {
                userId,
                exercise: body.exercise,
                reps: body.reps,
                weight: body.weight,
                createdAt: body.createdAt
            }
        })

        return NextResponse.json({
            data: createdSet,
            date: createdSet.createdAt.toISOString().split("T")[0]
        }, { status: 200 })

    } catch (e) {
        return NextResponse.json({}, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    const token = await getToken({req: request})
    if (!token) {
        return NextResponse.json({
            "data": "Unauthorized"
        }, {status: 401})
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId")
    const createdAt = searchParams.get("createdAt")

    if (!userId || !createdAt) {
        return NextResponse.json({
            data: "Missing query params, userId or createdAt"
        }, { status: 400 })
    }

    if (parseInt(userId) !== token.id) {
        return NextResponse.json({
            data: "Only the owner of this set can delete it"
        }, { status: 401 })
    }

    try {
        const deletedSet = await prisma.set.delete({
            where: {
                userId_createdAt: { userId: token.id, createdAt }
            }
        })

        if (!deletedSet) {
            return NextResponse.json({
                data: "Requested set for deletion does not exist"
            }, { status: 400 })
        }

        return NextResponse.json({}, {status: 200})
    } catch (e) {
        console.error(e)
        return NextResponse.json({}, {status: 500})
    }
}

export async function PUT(request: NextRequest) {

}