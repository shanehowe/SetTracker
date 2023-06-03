import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const exercises = await prisma.exercise.findMany({})
        return NextResponse.json({
            data: exercises
        })
    } catch(e) {
        return NextResponse.json({}, {status: 500})
    }
}