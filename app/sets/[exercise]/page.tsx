"use client"
import {
    Button,
    Flex,
    Heading,
    Icon,
    Text,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { useEffect, useState } from "react";
import { setsService } from "@/services/sets";
import { SetGroup } from "@/components/SetGroup/SetGroup";
import DeleteModal from "@/components/DeleteModal/DeleteModal";
import { AddSetModal } from "@/components/AddSetModal/AddSetModal";
import { sortGroupedSetsByDate } from "@/lib/sets";
import { GroupedSet, WeightSet } from "@/types/types";

interface PageProps {
    params: {
        exercise: string
    }
}

type SetForDelete = {
    createdAt?: string | Date,
    userId?: number
}

export default function Page({ params }: PageProps) {
    const exercise = decodeURIComponent(params.exercise)
    const [allSets, setAllSets] = useState<GroupedSet[] | null>(null)
    const [exerciseSetForDelete, setExerciseSetForDelete] = useState<SetForDelete>({})
    const [submitting, setSubmitting] = useState(false)
    const deleteControls = useDisclosure()
    const addSetControls = useDisclosure()
    const toast = useToast()

    useEffect(() => {
        setsService
            .getAll(exercise)
            .then(res => res.json())
            .then(res => setAllSets(res.data))
            .catch((e) => console.log(e))
    }, [exercise])

    const handleNewSet = async (weightSet: WeightSet) => {
        if (weightSet.reps <= 0 || weightSet.weight <= 0 || allSets === null) {
            return
        }

        setSubmitting(true)
        try {
            const apiRes = await setsService.post(weightSet)
            const res = await apiRes.json()
            if (apiRes.status !== 200) {
                toast({
                    status: "error",
                    description: res.data,
                    isClosable: true,
                    position: "bottom"
                })
                setSubmitting(false)
                addSetControls.onClose()
                return
            }

            let found = false
            for (let i = 0; i < allSets.length; i++) {
                if (allSets[i].date === res.date) {
                    allSets[i].sets.unshift(res.data)
                    setAllSets([...allSets])
                    found = true
                    break
                }
            }

            if (!found) {
                const newState = [{date: res.date, sets: [res.data]}, ...allSets]
                sortGroupedSetsByDate(newState)
                setAllSets(newState)
            }
            
            toast({
                status: "success",
                description: "New set added to history",
                position: "bottom",
                isClosable: true
            })
            addSetControls.onClose()
            setSubmitting(false)
        } catch (error) {
            toast({
                status: "error",
                position: "bottom",
                description: "Something unexpected happened. Refresh and try again"
            })
            addSetControls.onClose()
            setSubmitting(false)
            console.error(error)
        }
    }

    const handleDeleteIconClick = (userId: number, createdAt: string | Date) => {
        setExerciseSetForDelete({ userId, createdAt })
        deleteControls.onOpen()
    }

    const handleDelete = async () => {
        if (!exerciseSetForDelete.createdAt || !exerciseSetForDelete.userId || allSets === null) {
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

            for (let i = 0; i < allSets.length; i++) {
                const cur = allSets[i]
                if (cur.date === arrWhereSetExists) {
                    cur.sets = cur.sets.filter((set) => {
                        return set.createdAt !== createdAt
                    })

                    if (cur.sets.length === 0) {
                        const newAllSets = allSets.filter((setGroup) => {
                            return setGroup.date !== cur.date
                        })
                        setAllSets(newAllSets)
                    } else {
                        setAllSets([...allSets])
                    }
                    toast({
                        status: "success",
                        description: "Removed set from exercise history",
                        isClosable: true,
                        position: "bottom"
                    })
                    deleteControls.onClose()
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

    const handleUpdate = async (set: WeightSet, callback: CallableFunction) => {
        if (allSets === null) return;

        setSubmitting(true)
        try {
            const apiRes = await setsService.put(set)
            const res = await apiRes.json()
            if (apiRes.status !== 200) {
                console.log(res)
            } else {
                const setData = allSets.filter((set) => set.date === res.date)[0]
                const setForUpdateIndex = setData.sets.findIndex((set) => {
                    return set.createdAt === res.data.createdAt
                })

                setData.sets[setForUpdateIndex] = res.data
                const newAllSets = allSets.filter((set) => set.date !== res.date)
                newAllSets.push(setData)
                sortGroupedSetsByDate(newAllSets)
                setAllSets([...newAllSets])
                toast({
                    status: "success",
                    description: "Set updated successfully",
                    position: "bottom",
                    isClosable: true
                })
                callback(false)
            }
        } catch(e) {
            toast({
                status: "error",
                description: "Set wasnt updated. Refresh and try again.",
                isClosable: true,
                position: "bottom"
            })
        }
        setSubmitting(false)
    }

    const renderSetsOrNoSets = () => {
        if (allSets === null) {
            return <Text>Fetching set history...</Text>
        } else if (allSets.length) {
            return allSets.map(setObj => {
                return <SetGroup
                    submitting={submitting}
                    key={setObj.date.toString()}
                    date={setObj.date}
                    sets={setObj.sets}
                    handleDeleteIconClick={handleDeleteIconClick}
                    handleUpdate={handleUpdate}
                />
            })
        } else {
            return <Text>No set hisory...</Text>
        }
    }

    return (
        <Flex w={"100%"} direction={"column"} alignItems={"center"} mt={12}>
            <Heading textAlign={"center"} mb={3} as={"h1"} size={"xl"}>
                {exercise}
            </Heading>

            <DeleteModal
                handleDelete={handleDelete}
                isOpen={deleteControls.isOpen}
                onClose={deleteControls.onClose}
                additionalInfo=""
            />

            <AddSetModal
                isOpen={addSetControls.isOpen}
                onClose={addSetControls.onClose}
                exercise={exercise}
                handleNewSet={handleNewSet}
                submitting={submitting}
            />

            <Button
                mt={3}
                mb={8}
                size={"md"}
                leftIcon={<Icon as={FiPlus} />}
                onClick={addSetControls.onOpen}
                colorScheme="teal"
            >
                New Set
            </Button>
            {renderSetsOrNoSets()}
        </Flex>
    )
}