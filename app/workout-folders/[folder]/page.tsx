"use client"
import FolderHeading from "@/components/FolderHeading/FolderHeading"
import LoadingSpinner from "@/components/spinner/LoadingSpinner"
import { getAllExercises } from "@/services/exercises"
import { workoutFolderService } from "@/services/workoutFolders"
import { Flex } from "@chakra-ui/react"
import { FolderExercise } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


interface PageProps {
    params: {
        folder: string
    }
}

export default function Page({ params }: PageProps) {
    const [folderExercises, setFolderExercises] = useState<FolderExercise[] | null>(null)
    const [folder, setFolder] = useState<Folder>({folderId: -1, folderName: ""})

    const {data: session} = useSession()
    const router = useRouter()

    if (session === null) router.push("/")

    const folderParam = decodeURIComponent(params.folder)

    useEffect(() => {
        const maybeFolderId = parseInt(folderParam)
        if (!isNaN(maybeFolderId)) {
            workoutFolderService
                .getOne(maybeFolderId)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    setFolder({
                        folderName: res.data.folderName,
                        folderId: res.data.folderId
                    })
                    setFolderExercises(res.data.folderExercises)
                })
                .catch(err => console.error(err))
        } else {
            getAllExercises()
                .then(res => res.json())
                .then(res => {
                    setFolder({
                        folderName: "All Exercises",
                        folderId: -1
                    })
                    setFolderExercises(res.data.folderExercises)
                    console.log(res)
                })
            
        }
    },[folderParam])

    const handleDelete = async (id: number) => {
        console.log("Fired")
        try {
            const res = await workoutFolderService.deleteFolder(id)
            if (res.status === 200) {
                router.push("/workout-folders")
            }
        } catch(e) {
            console.error(e)
        }
    }

    return folderExercises === null ? (
        <LoadingSpinner />
    ) : (
        <section>
            <Flex w={"100%"} direction={"column"} alignItems={"center"} mt={12}>
                    <FolderHeading
                        handleDelete={handleDelete}
                        folder={folder}
                    />
            </Flex>
        </section>
    )
}