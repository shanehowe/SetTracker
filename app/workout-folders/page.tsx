"use client"

import { useState } from "react"
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

import AddFolderModal from "@/components/AddFolderModal"

import styles from "./styles.module.css"
import { useRouter } from "next/navigation"
import { Link } from "@chakra-ui/next-js"

const workoutFolders: exerciseFolder[] = [
    {
        title: "Push Day",
        exercises: []
    },
    {
        title: "Pull Day",
        exercises: []
    },
]

export default function Page() {
    const [folders, setFolders] = useState(workoutFolders)
    const [modalVisible, setModalVisible] = useState(false)
    const [newFolderName, setNewFolderName] = useState("")
    const router = useRouter()
    const toast = useToast()

    const addNewFolder = (folderName: string, exercises: string[]): void => {
        const trimmedFolder = folderName.trim()
        if (!trimmedFolder.length || !folderName) {
            toast({
                description: `Folder name cannot be blank`,
                status: "warning",
                position: "top",
                isClosable: true
            })
            return
        }

        const folderExists = folders.filter((f) => f.title === trimmedFolder).length > 0;
        if (folderExists) {
            toast({
                description: `${trimmedFolder} already exits!`,
                status: "info",
                position: "top",
                isClosable: true
            })
            return
        }
        setFolders(folders.concat({
            title: trimmedFolder,
            exercises: exercises
        }))
        hideModal();
        setNewFolderName("")
        toast({
            description: `Folder ${trimmedFolder} has been added!`,
            status: "success",
            position: "top",
            isClosable: true
        })
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
            />
            <List 
                spacing={4} 
                w="50%"
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
                    All Exercises
                    <ListIcon as={FiChevronRight}/>
                </ListItem>
                <Divider />

                {folders.map((f, i) => {
                    return (
                        <>
                            <ListItem 
                                key={f.title}
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
                                        pathname: `/workout-folders/${f.title}`,
                                        query: f
                                    }}
                                >
                                    {f.title}
                                </Link>
                                <ListIcon as={FiChevronRight}/>
                            </ListItem>
                            <Divider />
                        </>
                    )
                })}
            </List>
        </section>
    )
}