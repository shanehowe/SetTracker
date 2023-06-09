"use client"

import { useEffect, useState } from "react"
import { FiFolder, FiChevronRight, FiPlus } from "react-icons/fi"
import {
    List,
    ListItem,
    ListIcon,
    Divider,
    Button,
    Icon,
    useToast,
} from "@chakra-ui/react"
import { Link } from "@chakra-ui/next-js"

import AddFolderModal from "@/components/AddFolderModal"

import styles from "./styles.module.css"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import WorkoutFolders from "@/components/WorkoutFolders/WorkoutFolders"

import { workoutFolderHelper } from "@/lib/workoutFolders"
import { workoutFolderService } from "@/services/workoutFolders"

export default function FoldersPage({ exercises }: { exercises: Exercise[] }) {
    const [folders, setFolders] = useState<ExerciseFolder[]>([])
    const [modalVisible, setModalVisible] = useState(false)
    const [newFolderName, setNewFolderName] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    const toast = useToast()

    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/")
            toast({
                status: "warning",
                title: "Account required",
                description: "You have an ccount and be signed in to access that page",
                position: "top"
            })
        }
    })

    useEffect(() => {
        setNewFolderName("")
    }, [modalVisible])

    useEffect(() => {
        workoutFolderService
            .getAll()
            .then(res => res.json())
            .then(res => setFolders(res.data))
            .catch(error => {
                toast({
                    status: "error",
                    description: "Error fetching folders. Refresh and try again",
                    title: "Something went wrong."
                })
                console.error(error)
            })
    },[folders])

    const addNewFolder = async (folderName: string, exercises: string[]) => {
        setIsSubmitting(true)
        if (!folderName.length) {
            toast({
                description: "Folder name cannot be blank",
                status: "warning",
                position: "top",
                isClosable: true
            })
            setIsSubmitting(false)
            return
        }

        const trimmedFolder = workoutFolderHelper.trimAndTitleFolderName(folderName)

        if (workoutFolderHelper.folderAlreadyExists(trimmedFolder, folders)) {
            toast({
                description: `${trimmedFolder} already exits!`,
                status: "info",
                position: "top",
                isClosable: true
            })
            setIsSubmitting(false)
            return
        }

        try {
            const apiResponse = await workoutFolderService.create(trimmedFolder, exercises)
            const response = await apiResponse.json()
            if (apiResponse.status !== 200) {
                console.log(response)
                setIsSubmitting(false)
                return
            }
            const { data } = response
            setFolders(folders.concat({
                folderName: data.folderName,
                id: data.id
            }))
            hideModal();
            setNewFolderName("")
            toast({
                description: `Folder ${trimmedFolder} has been added!`,
                status: "success",
                position: "top",
                isClosable: true
            })
            setIsSubmitting(false)
        } catch(e) {
            console.error(e)
            hideModal();
            setNewFolderName("")
            toast({
                description: "An error occured trying to create that folder",
                status: "error",
                position: "top",
                isClosable: true
            })
            setIsSubmitting(false)
        }
    }

    const openModal = (): void => {
        setModalVisible(true);
    }

    const hideModal = (): void => {
        setModalVisible(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewFolderName(e.target.value);
    }

    return (
            <section className={styles.section}>
                <h3 className={styles.heading} >Your workout folders.</h3>
                <Button
                    onClick={openModal}
                    variant="solid"
                    margin={10}
                    leftIcon={<Icon as={FiPlus} />}
                >
                New Folder
                </Button>
                <AddFolderModal
                    isOpen={modalVisible}
                    folderName={newFolderName}
                    onClose={hideModal}
                    handleInputChange={handleInputChange}
                    handleCreateFolder={addNewFolder}
                    isSubmitting={isSubmitting}
                    exercises={exercises}
                    
                />
                <List
                    spacing={4} 
                    w="80%"
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    alignItems="center"
                >
                    <ListItem
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        w={250}
                        cursor="pointer"
                        fontSize={18}
                    >
                        <ListIcon as={FiFolder}/>
                        <Link
                            href={{
                                pathname: "/workout-folders/All Exercises",
                            }}
                        >
                            All Exercises
                        </Link>
                        <ListIcon as={FiChevronRight}/>
                    </ListItem>
                    <Divider />
                    <WorkoutFolders exerciseFolders={folders}/>
                </List>
            </section>
        )
}