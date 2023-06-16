"use client"
import DeleteModal from "@/components/DeleteModal/DeleteModal"
import { EditFolderNameModal } from "@/components/EditFolderNameModal/EditFolderNameModal"
import FolderExercises from "@/components/FolderExercises/FolderExercises"
import FolderHeading from "@/components/FolderHeading/FolderHeading"
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner"
import { workoutFolderHelper } from "@/lib/workoutFolders"
import { workoutFolderService } from "@/services/workoutFolders"
import { Flex, Heading, useDisclosure, useToast } from "@chakra-ui/react"
import { FolderExercise } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


interface PageProps {
    exercises: Exercise[]
    folderId: number
}

export default function FolderExercisesPage({ exercises, folderId }: PageProps) {
    const [folderExercises, setFolderExercises] = useState<FolderExercise[] | null>(null)
    const [folder, setFolder] = useState<Folder>({folderId: -1, folderName: ""})
    // State for modal to edit folder name
    const [editFolderNameOpen, setEditFolderNameOpen] = useState(false)
    const [addNewExercisesOpen, setAddNewExercisesOpen] = useState(false)
    const [exerciseForDelete, setExerciseForDelete] = useState<string>("")
    const [newFolderName, setNewFolderName] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { onOpen, isOpen, onClose } = useDisclosure()
    const router = useRouter()
    const toast = useToast()

    useEffect(() => {
            workoutFolderService
                .getOne(folderId)
                .then(res => res.json())
                .then(res => {
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
    },[folderId])

    const onEditFolderNameClose = () => {
        setEditFolderNameOpen(false)
    }

    const onEditFolderNameOpen = () => {
        setEditFolderNameOpen(true)
    }

    const handleFolderDelete = async () => {
        try {
            const res = await workoutFolderService.deleteFolder(folder.folderId)
            if (res.status === 200) {
                router.push("/workout-folders")
                toast({
                    status: "success",
                    position: "top",
                    description: `${folder.folderName} was deleted successfully!`,
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

    const handleFolderRename = async () => {
        setIsSubmitting(true)
        const folderNameForRequest = workoutFolderHelper.trimAndTitleFolderName(newFolderName)

        if (!folderNameForRequest.length) {
            toast({
                status: "warning",
                title: "New folder name cannot be blank",
                position: "top",
                isClosable: true
            })
            setIsSubmitting(false)
            return
        }

        const res_ = await workoutFolderService.put(folder.folderId, folderNameForRequest)
        const res = await res_.json()

        if (res_.status !== 200) {
            toast({
                status: "error",
                title: res.data,
                position: "top",
                isClosable: true
            })
            setIsSubmitting(false)
            return
        }

        const newFolderState = {
            folderId: folder.folderId,
            folderName: res.data.newFolderName
        }

        setFolder(newFolderState)
        toast({
            status: "success",
            title: "Folder name has been updated",
            position: "top",
            isClosable: true
        })
        onEditFolderNameClose()
        setNewFolderName("")
        setIsSubmitting(false)
    }

    const handleFolderRenameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewFolderName(e.target.value)
    }

    const handleAddMoreExercisesToFolder = async (newExercises: string[]) => {
        if (!newExercises.length) {
            toast({
                status: "warning",
                description: "No exercises selected",
                position: "top",
                isClosable: true
            })
            setIsSubmitting(false)
            return
        }
        setIsSubmitting(true)
        try {
            const res = await workoutFolderService.put(folder.folderId, undefined, newExercises)
            const { data } = await res.json()
            if (res.status === 200) {
                // @ts-ignore
                setFolderExercises(folderExercises.concat(data))
                toast({
                    status: "success",
                    description: "Folder updated successfully",
                    position: "top",
                    isClosable: true
                })
            } else {
                toast({
                    status: "error",
                    description: data,
                    position: "top",
                    isClosable: true
                })
            }
        } catch (e) {
            toast({
                status: "error",
                title: "Something unexpected happened",
                description: "Refresh the page and try again",
                position: "top",
            })
        }
        setIsSubmitting(false)
        setAddNewExercisesOpen(false)
    }

    const onAddNewExercisesOpen = () => {
        setAddNewExercisesOpen(true)
    }

    const onAddNewExercisesClose = () => {
        setAddNewExercisesOpen(false)
    }

    return folderExercises === null ? (
        <LoadingSpinner />
    ) : (
        <section>
            <Flex w={"100%"} direction={"column"} alignItems={"center"} mt={12}>
                    <FolderHeading
                        onAddNewExercisesClose={onAddNewExercisesClose}
                        onAddNewExercisesOpen={onAddNewExercisesOpen}
                        handleAddNewExercises={handleAddMoreExercisesToFolder}
                        addNewExercisesOpen={addNewExercisesOpen}
                        currentFolderExercises={folderExercises}
                        exercises={exercises}
                        handleDelete={handleFolderDelete}
                        folder={folder}
                        onEditFolderNameOpen={onEditFolderNameOpen}
                        isSubmitting={isSubmitting}
                    />
                    {/* This modal is for deleting exercises
                        modal for deleting folder is inside FolderHeading */}
                    <DeleteModal
                        onClose={onClose}
                        isOpen={isOpen}
                        handleDelete={handleExerciseDelete}
                        folderId={folder.folderId}
                        additionalInfo={""}
                    />
                    <EditFolderNameModal
                        isOpen={editFolderNameOpen}
                        onClose={onEditFolderNameClose}
                        handleInputChange={handleFolderRenameInputChange}
                        handleSubmit={handleFolderRename}
                        isSubmitting={isSubmitting}
                    />
                    <FolderExercises
                        folderExercises={folderExercises}
                        handleDeleteIconClick={handleDeleteIconClick}
                    />
            </Flex>
        </section>
    )
}