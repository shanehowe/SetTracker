import {
    Container,
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
import { useState } from "react";
import { FiCheck, FiEdit, FiEdit3, FiTrash, FiX } from "react-icons/fi";

export function ExerciseSet({}) {
    const [isEditing, setIsEditing] = useState(false)
    const [KgValue, setKgValue] = useState("10")
    const [repsValue, setRepsValue] = useState("10")

    const formatKg = (val: string) => val + " Kg"
    const parseKg = (val: string) => val.replace(" Kg", "")

    const formatReps = (val: string) => val + " R"
    const parseReps = (val: string) => val.replace(" R", "")

    return (
        <Container width={isEditing ? 900 : ""}>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
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
                        >
                            Delete
                        </MenuItem>
                    </MenuList>
                </Menu>}

                {isEditing ? 
                <>
                <NumberInput
                    size='sm'
                    maxW={105}
                    ml={3}
                    mr={3}
                    defaultValue={15}
                    min={10}
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
                    defaultValue={15}
                    min={10}
                    onChange={(reps) => setRepsValue(parseReps(reps))}
                    value={formatReps(repsValue)}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>

                <Container>
                <IconButton as={FiCheck} aria-label={""} size={"sm"} mr={3}/>
                <IconButton as={FiX} aria-label={""} size={"sm"} onClick={() => setIsEditing(false)}/>
                </Container>
                
                </>
                : 
                <>
                <Text fontSize={19}>{10}{" "}Kg</Text>
                <Text fontSize={19}>{10}{" "}Reps</Text>
                </>}
            </Flex>
        </Container>
    )
}