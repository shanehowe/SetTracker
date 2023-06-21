"use client"
import {
    Button,
    Flex,
    Heading,
    Icon,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { setsService } from "@/services/sets";
import { Set } from "@prisma/client";
import { SetGroup } from "@/components/SetGroup/SetGroup";
import DeleteModal from "@/components/DeleteModal/DeleteModal";

interface PageProps {
    params: {
        exercise: string
    }
}

interface GroupedSets {
    date: string;
    sets: Set[];
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
    const [exerciseSetForDelete, setExerciseSetForDelete] = useState({})

    useEffect(() => {
        setsService
            .getAll(exercise)
            .then(res => res.json())
            .then(res => {
                const state: GroupedSets[] = []
                for (const [key, value] of Object.entries(res.data)) {
                    // @ts-ignore
                    state.push({ date: key, sets: value })
                }
                setAllSets(state)
            })
            .catch((e) => console.log(e))
    }, [exercise])

    const handleNewSet = async (weightSet: WeightSet) => {
        if (weightSet.reps <= 0 || weightSet.weight <= 0) {
            return
        }
    }

    const handleDeleteIconClick = (userId: number, createdAt: string | Date) => {
        setExerciseSetForDelete({ userId, createdAt })
    }

    return (
        <Flex w={"100%"} direction={"column"} alignItems={"center"} mt={12}>
            <Heading mb={3} as={"h1"} size={"lg"}>
                {exercise}
            </Heading>

            <Button
                mt={3}
                mb={8}
                size={"md"}
                leftIcon={<Icon as={FiPlus} />}
                onClick={() => handleNewSet(set)}
            >
                New Set
            </Button>

            {allSets.map(setObj => {
                return <SetGroup
                            date={setObj.date}
                            sets={setObj.sets}
                            handleDeleteIconClick={handleDeleteIconClick}
                        />
            })}
        </Flex>
    )
}