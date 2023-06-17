import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

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
    
}

export async function POST(request: NextRequest) {

}

export async function DELETE(request: NextRequest) {

}

export async function PUT(request: NextRequest) {

}