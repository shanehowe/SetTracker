import { Flex, List, Text } from "@chakra-ui/react"
import { Set } from "@prisma/client"
import { ExerciseSet } from "../ExerciseSet/ExerciseSet"

interface SetGroupProps {
    date: string
    sets: Set[]
    handleDeleteIconClick: (userId: number, createdAt: string | Date) => void
}

export function SetGroup({ date, sets, handleDeleteIconClick }: SetGroupProps) {
    return (
        <>
            <Flex justifyContent={"flex-start"} w={"30%"} mt={5} mb={2}>
                <Text size={"sm"}>{date}</Text>
            </Flex>

            <List
                spacing={4} 
                w="45%"
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
            >
                {sets.map((set) => {
                    return <ExerciseSet
                                set={set}
                                handleDeleteIconClick={handleDeleteIconClick}
                            />
                })}
            </List>
        </>
    )
}