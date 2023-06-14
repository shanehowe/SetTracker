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

    const folderId = parseInt(params.id)

    if (isNaN(folderId)) {
        return NextResponse.json({
            data: "Folder id param must be a valid integer"
        }, {status: 400})
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

type PutBody = {
    newFolderName?: string
    newExercises?: string[]
}

export async function PUT(request: NextRequest, { params }: { params: { id: string }}) {
    const token = await getToken({ req: request })

    if (!token) {
        return NextResponse.json({
            data: "Unauthorized"
        }, { status: 401 })
    }

    const userId = token.id
    const folderId = parseInt(params.id)

    if (isNaN(folderId)) {
        return NextResponse.json({
            data: "Invalid folder id"
        }, {status: 400})
    }

    try {
        const body: PutBody = await request.json()
        const { newFolderName, newExercises } = body

        const folderForUpdate = await prisma.workoutFolder.findFirst({
            where: {
                id: folderId,
                userId: userId
            }
        })

        if (!folderForUpdate) {
            return NextResponse.json({
                data: "Only the owner of this folder may update it"
            }, {status: 400})
        }
        
        if (newFolderName) {
            const possibleDuplicate = await prisma.workoutFolder.findFirst({
                where: {
                    userId: userId,
                    folderName: newFolderName
                }
            })

            if (possibleDuplicate) {
                return NextResponse.json({
                    data: `${newFolderName} already exists`
                }, {status: 400})
            }

            const updatedFolder = await prisma.workoutFolder.update({
                where: {
                    id: folderId
                },
                data: {
                    folderName: newFolderName
                }
            })

            if (!updatedFolder) {
                return NextResponse.json({
                    data: "Folder has not been updated"
                }, {status: 400})
            }
    
            return NextResponse.json({
                data: {
                    newFolderName: updatedFolder.folderName
                }
            }, {status: 200})

        } else if (newExercises) {
            const exercisesToAdd = newExercises.map((exercise) => {
                return {
                    folderId,
                    exercise
                }
            })

            const addedExercises = await prisma.$transaction(
                exercisesToAdd.map((exercise) => prisma.folderExercise.create({
                    data: exercise
                }))
            )

            return NextResponse.json({
                data: addedExercises
            }, { status: 200 })
        } else {
            return NextResponse.json({
                data: "Missing info, expected either a new folder name or new exercies"
            }, { status: 400 })
        }
    } catch(e) {
        return NextResponse.json({}, {status: 500})
    }
}