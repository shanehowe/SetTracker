"use client"
import {
    Button,
    Container,
    Divider,
    Flex,
    Heading,
    Icon,
    List,
    ListItem,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { setsService } from "@/services/sets";
import { Set } from "@prisma/client";
import { ExerciseSet } from "@/components/ExerciseSet/ExerciseSet";

interface PageProps {
    params: {
        exercise: string
    }
}

interface GroupedSets {
    [date: string]: Set[];
}

export default function Page({ params }: PageProps) {
    const exercise = decodeURIComponent(params.exercise)
    const [set, setSet] = useState<WeightSet>({
        exercise: exercise,
        reps: 0,
        weight: 0,
        createdAt: undefined
    })
    const [allSets, setAllSets] = useState<GroupedSets[]>([])

    useEffect(() => {
        setsService
            .getAll(exercise)
            .then(res => res.json())
            .then(res => setAllSets(res.data))
            .catch((e) => console.log(e))
    }, [exercise])

    console.log(allSets, typeof allSets)

    const handleNewSet = async (weightSet: WeightSet) => {
        if (weightSet.reps <= 0 || weightSet.weight <= 0) {
            return
        }
    }

    return (
        <Flex w={"100%"} direction={"column"} alignItems={"center"} mt={12}>
            <Heading mb={3} as={"h1"} size={"lg"}>
                {exercise}
            </Heading>

            <Button
                mt={3}
                size={"md"}
                leftIcon={<Icon as={FiPlus} />}
                onClick={() => handleNewSet(set)}
            >
                New Set
            </Button>

            <List w={300} spacing={3}>
            {Object.keys(allSets).map((key) => {
                console.log(key)
                return (
                    <>
                        <ListItem>
                            <ExerciseSet />
                        </ListItem>
                        <Divider />
                    </>
                )
            })}
            </List>
        </Flex>
    )
}