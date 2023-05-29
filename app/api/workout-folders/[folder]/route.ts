import { NextResponse } from "next/server";

export async function GET(resquest: Request, { params }: WorkoutFoldersGetParams) {
    return NextResponse.json({"folder": params.folder})
}