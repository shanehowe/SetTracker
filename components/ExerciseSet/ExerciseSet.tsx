import { Container, Flex, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";

export function ExerciseSet({}) {
    const [isEditing, setIsEditing] = useState(false)
    return (
        <Container>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Menu>
                    <MenuButton
                        size={"sm"}
                        as={IconButton}
                        icon={<Icon as={FiEdit} />}
                        onClick={() => setIsEditing(!isEditing)}
                    />
                    <MenuList>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                    </MenuList>
                </Menu>

                <Text fontSize={19}>{10}{" "}Kg</Text>
                <Text fontSize={19}>{10}{" "}Reps</Text>
            </Flex>
        </Container>
    )
}