"use client"
import DeleteModal from "@/components/DeleteModal/DeleteModal"
import FolderExercises from "@/components/FolderExercises/FolderExercises"
import FolderHeading from "@/components/FolderHeading/FolderHeading"
import LoadingSpinner from "@/components/spinner/LoadingSpinner"
import { getAllExercises } from "@/services/exercises"
import { workoutFolderService } from "@/services/workoutFolders"
import { Divider, Flex, Heading, List, ListIcon, ListItem, Text, useDisclosure, useToast } from "@chakra-ui/react"
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
    const [exerciseForDelete, setExerciseForDelete] = useState<string>("")
    const { onOpen, isOpen, onClose } = useDisclosure()
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


    const handleFolderDelete = async () => {
        try {
            const res = await workoutFolderService.deleteFolder(folder.folderId)
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

    const handleExerciseDelete = async () => {
        try {
            const res = await workoutFolderService.deleteExerciseFromFolder(folder.folderId, exerciseForDelete)
            if (res.status !== 200) {
                toast({
                    status: "error",
                    title: "Something went wrong",
                    description: "Exercise was not removed from folder"
                })
                return
            }

            const newExercisesState = folderExercises?.filter(folderExercise => {
                return folderExercise.exercise !== exerciseForDelete
            })

            if (newExercisesState) {
                setFolderExercises(newExercisesState)
                toast({
                    status: "success",
                    title: "Exercise deleted",
                    description: `${exerciseForDelete} has been removed from the current folder`,
                    isClosable: true,
                    position: "top"
                })
            }
            setExerciseForDelete("")
            onClose()
        } catch(e) {
            console.error(e)
        }
    }

    const handleDeleteIconClick = (exercise: string) => {
        setExerciseForDelete(exercise)
        onOpen()
    }

    return folderExercises === null ? (
        <LoadingSpinner />
    ) : (
        <section>
            <Flex w={"100%"} direction={"column"} alignItems={"center"} mt={12}>
                    {folder.folderName === "All Exercises" ?
                    /*
                        when all exercises is the folder name
                        we need to render completely different UI.
                        For now its ok until we complete UI for when it
                        is not all exercises
                    */
                    <Heading>{folder.folderName}</Heading>
                    :
                    <FolderHeading
                        handleDelete={handleFolderDelete}
                        folder={folder}
                    />}
                    <DeleteModal
                        onClose={onClose}
                        isOpen={isOpen}
                        handleDelete={handleExerciseDelete}
                        folderId={folder.folderId}
                        additionalInfo={""}
                    />
                    <FolderExercises
                        folderExercises={folderExercises}
                        handleDeleteIconClick={handleDeleteIconClick}
                    />
            </Flex>
        </section>
    )
}