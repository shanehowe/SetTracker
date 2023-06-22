"use client"
import {
    Button,
    Flex,
    Heading,
    Icon,
    useDisclosure,
    useToast,
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

type SetForDelete = {
    createdAt?: string | Date,
    userId?: number
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
    const [exerciseSetForDelete, setExerciseSetForDelete] = useState<SetForDelete>({})
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

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
        onOpen()
    }

    const handleDelete = async () => {
        if (!exerciseSetForDelete.createdAt || !exerciseSetForDelete.userId) {
            return
        }

        const { userId, createdAt } = exerciseSetForDelete

        try {
            const res = await setsService.remove(exercise, userId, createdAt)
            if (res.status !== 200) {
                // TODO: handle error...
                console.log(res)
                return
            }

            const arrWhereSetExists = createdAt.toString().split("T")[0]

            // This is messy and potentially slow...
            // Maybe when setting exerciseForDelete
            // add property for what index in the array is it
            // for constant access time.
            for (let i = 0; i < allSets.length; i++) {
                const cur = allSets[i]
                if (cur.date === arrWhereSetExists) {
                    cur.sets = cur.sets.filter((set) => {
                        return set.createdAt !== createdAt
                    })
                    setAllSets([...allSets])
                    toast({
                        status: "success",
                        description: "Removed set from exercise history",
                        isClosable: true,
                        position: "top"
                    })
                    onClose()
                    return
                }
            }
        } catch (e) {
            console.error(e)
            toast({
                status: "error",
                description: "Set wasnt removed. Refresh and try again.",
                isClosable: true,
                position: "top"
            })
        }
    }

    return (
        <Flex w={"100%"} direction={"column"} alignItems={"center"} mt={12}>
            <Heading mb={3} as={"h1"} size={"lg"}>
                {exercise}
            </Heading>

            <DeleteModal
                handleDelete={handleDelete}
                isOpen={isOpen}
                onClose={onClose}
                additionalInfo=""
            />

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
                            key={setObj.date.toString()}
                            date={setObj.date}
                            sets={setObj.sets}
                            handleDeleteIconClick={handleDeleteIconClick}
                        />
            })}
        </Flex>
    )
}