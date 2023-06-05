"use client"
import LoadingSpinner from "@/components/spinner/LoadingSpinner"
import { workoutFolderService } from "@/services/workoutFolders"
import { Button, Flex, Icon, Text } from "@chakra-ui/react"
import { FolderExercise } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FiFolder } from "react-icons/fi"

interface PageProps {
    params: {
        folder: string
    }
}

export default function Page({ params }: PageProps) {
    const [folderExercises, setFolderExercises] = useState<FolderExercise[] | null>(null)
    const [folderName, setFolderName] = useState("")

    const router = useRouter()
    const folder = decodeURIComponent(params.folder)

    useEffect(() => {
        const maybeFolderId = parseInt(folder)
        if (!isNaN(maybeFolderId)) {
            workoutFolderService
                .getOne(maybeFolderId)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    setFolderExercises(res.data.folderExercises)
                    setFolderName(res.data.folderName)
                })
                .catch(err => console.error(err))
        } else {
            setFolderExercises([])
            setFolderName("All Exercies")
        }
    },[folder])

    const handleDelete = async (id: string) => {
        const folderId = parseInt(folder)
        try {
            const res = await workoutFolderService.deleteFolder(folderId)
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
                <Flex dir="row" alignItems={"center"}>
                    <Icon as={FiFolder} mr={3} w={21} h={21}/>
                    <div>
                        <Text fontSize={22}>{folderName}</Text>
                    </div>
                </Flex>
            </Flex>
        </section>
    )
}