import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const exercises = await prisma.exercise.findMany({})
    return NextResponse.json({
        data: exercises
    })
}