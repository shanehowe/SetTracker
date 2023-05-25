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
import Notification from "@/components/Notification"

import styles from "./styles.module.css"

const workoutFolders: string[] = [
    "Push Day",
    "Pull Day",
    "Legs",
    "Active Rest Day"
]

export default function Page() {
    const [folders, setFolders] = useState(workoutFolders)
    const [modalVisible, setModalVisible] = useState(false)
    const [newFolderName, setNewFolderName] = useState("")

    const toast = useToast()

    const addNewFolder = (folderName: string): void => {
        const trimmedFolder = folderName.trim()
        if (!folderName.length || !folderName) {
            return
        }

        const folderExists = folders.filter((f) => f === trimmedFolder).length > 0;
        if (folderExists) {
            toast({
                description: `${trimmedFolder} already exits!`,
                status: "info",
                position: "top",
                isClosable: true
            })
            return
        }
        setFolders(folders.concat(trimmedFolder));
        hideModal();
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
                                key={i}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                w={250}
                                cursor="pointer"
                                fontSize={18}
                            >
                                <ListIcon as={FiFolder}/>
                                {f}
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