import {
    Divider,
    Flex,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text
} from "@chakra-ui/react";
import { Set } from "@prisma/client";
import { useState } from "react";
import { FiCheck } from "@react-icons/all-files/fi/FiCheck";
import { FiEdit } from "@react-icons/all-files/fi/FiEdit";
import { FiEdit3 } from "@react-icons/all-files/Fi/FiEdit3";
import { FiTrash } from "@react-icons/all-files/fi/FiTrash";
import { FiX } from "@react-icons/all-files/fi/FiX";
import { WeightSet } from "@/types/types";

interface ExerciseSetProps {
    set: Set
    submitting: boolean
    handleDeleteIconClick: (userId: number, createdAt: string | Date) => void
    handleUpdate: (set: WeightSet, callback: CallableFunction) => void
}

export function ExerciseSet({ set, handleDeleteIconClick, handleUpdate, submitting }: ExerciseSetProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [KgValue, setKgValue] = useState<number | string>(set.weight)
    const [repsValue, setRepsValue] = useState<number>(set.reps)

    const formatKg = (val: number | string) => val.toString() + " Kg"
    const parseKg = (val: string) => val.replace(" Kg", "")

    const formatReps = (val: number | string) => val.toString() + " R"
    const parseReps = (val: string) => parseInt(val.replace(" R", ""))

    const handleCallback = () => setIsEditing(false)

    return (
        <>
            <Flex w={isEditing ? 350 : 300} alignItems={"center"} justifyContent={"space-between"}>
                {!isEditing && 
                <Menu>
                    <MenuButton
                        size={"sm"}
                        as={IconButton}
                        icon={<Icon as={FiEdit} />}
                        colorScheme="teal"
                    />
                    <MenuList>
                        <MenuItem 
                            onClick={() => setIsEditing(!isEditing)}
                            icon={<Icon as={FiEdit3} />}
                        >
                            Edit
                        </MenuItem>
                        <MenuDivider/>
                        <MenuItem
                            icon={<Icon as={FiTrash} />}
                            color={"red.500"}
                            onClick={() => handleDeleteIconClick(set.userId, set.createdAt)}
                        >
                            Delete
                        </MenuItem>
                    </MenuList>
                </Menu>}

                {isEditing ? 
                    <>
                        <NumberInput
                            precision={2}
                            size='sm'
                            maxW={110}
                            mr={3}
                            defaultValue={set.weight}
                            min={0}
                            step={0.25}
                            onChange={(kg) => setKgValue(parseKg(kg))}
                            value={formatKg(KgValue)}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>

                        <NumberInput
                            size='sm'
                            maxW={85}
                            defaultValue={set.reps}
                            min={1}
                            onChange={(reps) => setRepsValue(parseReps(reps))}
                            value={formatReps(repsValue)}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>

                        <IconButton
                            isLoading={submitting}
                            as={FiCheck}
                            aria-label={""}
                            size={"sm"}
                            mr={3}
                            onClick={() => {
                                handleUpdate({
                                    exercise: set.exercise,
                                    createdAt: set.createdAt,
                                    weight: Number(KgValue),
                                    reps: repsValue,
                                }, handleCallback)
                            }}
                            colorScheme="teal"
                            variant={"outline"}
                            cursor={"pointer"}
                        />
                        <IconButton
                            as={FiX}
                            aria-label={""}
                            size={"sm"}
                            onClick={() => setIsEditing(false)}
                            colorScheme="teal"
                            variant={"outline"}
                            cursor={"pointer"}
                        />
                
                    </>
                    : 
                    <>
                        <Text fontSize={19}>{set.weight}{" "}Kg</Text>
                        <Text fontSize={19}>{set.reps}{" "}Reps</Text>
                    </>}
                
            </Flex>
            <Divider />
        </>
    )
}