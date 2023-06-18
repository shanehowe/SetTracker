"use client"
import {
    Button,
    Flex,
    Heading,
    Icon,
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

    console.log(allSets)

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

            <Flex alignItems={"center"}>
                <Text fontWeight={"bold"}>KG:</Text>
                <NumberInput
                    size={"sm"}
                    maxW={100}
                    step={0.25}
                    min={1}
                    onChange={(val) => {
                        setSet({
                            ...set,
                            weight: parseFloat(val)
                        })
                    }}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>

                <Text fontWeight={"bold"} ml={2}>Reps: </Text>
                <NumberInput
                    size={"sm"}
                    maxW={20}
                    onChange={(val) => {
                        setSet({
                            ...set,
                            reps: parseInt(val)
                        })
                    }}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Flex>
            <Button
                mt={3}
                size={"sm"}
                leftIcon={<Icon as={FiPlus} />}
                onClick={() => handleNewSet(set)}
            >
                New Set
            </Button>
        </Flex>
    )
}