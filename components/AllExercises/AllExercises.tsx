"use client"

import { Flex, Heading, Input, Link, List, ListIcon, ListItem } from "@chakra-ui/react";
import { Exercise } from "@prisma/client";
import { useState } from "react";
import { CgChevronRight, CgGym } from "react-icons/cg";

interface ALlExercisesProps {
    exercises: Exercise[]
}

export default function ALlExercises({ exercises }: ALlExercisesProps) {
    const [search, setSearch] = useState("")

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const filteredData = search
    ? exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(search.toLowerCase())
      )
    : exercises;

    return (
        <Flex w={"100%"} direction={"column"} alignItems={"center"} mt={12}>
            <Heading mb={3} as={"h1"} size={"lg"}>All Exercises</Heading>
            <Input
                w={300}
                placeholder="Search exercises here"
                onChange={handleSearchChange}
            />

            <List
                spacing={4} 
                w="80%"
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
                mt={10}
            >
                {filteredData.map((exercise) => {
                    return (
                        <ListItem
                            key={exercise.id}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            w={350}
                            fontSize={18}
                        >
                            <ListIcon as={CgGym} />
                            <Link href={`http://localhost:3000/sets/${exercise.name}`}>
                            {exercise.name}
                            </Link>

                            <Link href={`http://localhost:3000/sets/${exercise.name}`}>
                            <ListIcon as={CgChevronRight} />
                            </Link>
                        </ListItem>
                    )
                })}
            </List>
        </Flex>
    )
}