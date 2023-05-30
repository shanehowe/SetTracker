import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: WorkoutFoldersGetParams) {
    return NextResponse.json({"folder": params.folder})
}