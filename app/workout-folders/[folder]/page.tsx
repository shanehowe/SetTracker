"use client"
import FolderHeading from "@/components/FolderHeading/FolderHeading"
import LoadingSpinner from "@/components/spinner/LoadingSpinner"
import { getAllExercises } from "@/services/exercises"
import { workoutFolderService } from "@/services/workoutFolders"
import { Divider, Flex, Heading, List, ListIcon, ListItem, Text, useToast } from "@chakra-ui/react"
import { FolderExercise } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { BiChevronRight, BiXCircle } from "react-icons/bi"


interface PageProps {
    params: {
        folder: string
    }
}

export default function Page({ params }: PageProps) {
    const [folderExercises, setFolderExercises] = useState<FolderExercise[] | null>(null)
    const [folder, setFolder] = useState<Folder>({folderId: -1, folderName: ""})
    const router = useRouter()
    const toast = useToast()

    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/")
        }
    })

    const folderParam = decodeURIComponent(params.folder)

    useEffect(() => {
        const maybeFolderId = parseInt(folderParam)
        if (!isNaN(maybeFolderId)) {
            workoutFolderService
                .getOne(maybeFolderId)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (res.data === "Requested folder does not exist") {
                        router.push("/workout-folders")
                    }
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
                    setFolderExercises(res.data)
                    console.log(res)
                })
            
        }
    },[folderParam])

    const handleDelete = async (id: number) => {
        try {
            const res = await workoutFolderService.deleteFolder(id)
            if (res.status === 200) {
                router.push("/workout-folders")
                toast({
                    status: "success",
                    position: "top",
                    title: `${folder.folderName} was deleted successfully!`,
                    isClosable: true
                })
            }
        } catch(e) {
            console.error(e)
        }
    }

    return folderExercises === null || status === "loading" ? (
        <LoadingSpinner />
    ) : (
        <section>
            <Flex w={"100%"} direction={"column"} alignItems={"center"} mt={12}>
                    {folder.folderName === "All Exercises" ?
                    <Heading>{folder.folderName}</Heading>
                    :
                    <FolderHeading
                        handleDelete={handleDelete}
                        folder={folder}
                    />}

                    <List
                        spacing={4} 
                        w="80%"
                        display="flex"
                        justifyContent="center"
                        flexDirection="column"
                        alignItems="center"
                        mt={10}
                    >
                    {folderExercises.map((folderExercise) => {
                        return (
                                <>
                                <ListItem
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    w={250}
                                    fontSize={18}
                                >
                                    <ListIcon as={BiXCircle} cursor={"pointer"} />
                                    <Text>{folderExercise.exercise}</Text>
                                    <ListIcon as={BiChevronRight} />
                                </ListItem>
                                <Divider />
                                </>
                        )
                    })}
                    </List>
            </Flex>
        </section>
    )
}