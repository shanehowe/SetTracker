import {
    Container,
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
import { FiCheck, FiEdit, FiEdit3, FiTrash, FiX } from "react-icons/fi";

interface ExerciseSetProps {
    set: Set
    handleDeleteIconClick: (userId: number, createdAt: string | Date) => void
}

export function ExerciseSet({ set, handleDeleteIconClick }: ExerciseSetProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [KgValue, setKgValue] = useState("10")
    const [repsValue, setRepsValue] = useState("10")

    const formatKg = (val: string) => val + " Kg"
    const parseKg = (val: string) => val.replace(" Kg", "")

    const formatReps = (val: string) => val + " R"
    const parseReps = (val: string) => val.replace(" R", "")

    return (
        <>
            <Flex w={isEditing ? 350 : 300} alignItems={"center"} justifyContent={"space-between"}>
                {!isEditing && 
                <Menu>
                    <MenuButton
                        size={"sm"}
                        as={IconButton}
                        icon={<Icon as={FiEdit} />}
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

                <IconButton as={FiCheck} aria-label={""} size={"sm"} mr={3}/>
                <IconButton as={FiX} aria-label={""} size={"sm"} onClick={() => setIsEditing(false)}/>
                
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