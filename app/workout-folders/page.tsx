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
  } from '@chakra-ui/react'

import styles from "./styles.module.css"

const workoutFolders: string[] = [
    "Push Day",
    "Pull Day",
    "Legs",
    "Active Rest Day"
]

export default function Page() {
    const [folders, setFolders] = useState(workoutFolders)

    const addNewFolder = (folderName: string) => {
        const trimmedFolder = folderName.trim()
        const folderExists = folders.filter((f) => f === trimmedFolder).length > 0;

        if (folderExists) {
            // Let the user know the folder exists already
            return
        }

        setFolders(folders.concat(trimmedFolder));
    }

    return (
        <section className={styles.section}>
            <h3 className={styles.heading} >Your workout folders.</h3>
            <Button 
                variant="solid"
                margin={10}
                leftIcon={<Icon as={FiPlus} />}
            >
                New Folder
            </Button>
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