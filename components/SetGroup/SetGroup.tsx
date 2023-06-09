import { Flex, List, Text } from "@chakra-ui/react"
import { Set } from "@prisma/client"
import { ExerciseSet } from "../ExerciseSet/ExerciseSet"
import { WeightSet } from "@/types/types"

interface SetGroupProps {
    date: string
    sets: Set[]
    submitting: boolean
    handleDeleteIconClick: (userId: number, createdAt: string | Date) => void
    handleUpdate: (set: WeightSet, callback: CallableFunction) => void
}

export function SetGroup({ date, sets, handleDeleteIconClick, handleUpdate, submitting }: SetGroupProps) {
    if (!sets.length) {
        return null
    }
    
    return (
        <>
            <Flex justifyContent={"flex-start"} w={"40%"} mt={5} mb={2}>
                <Text
                    size={"sm"}
                    fontWeight={"bold"}
                >
                    {date}
                </Text>
            </Flex>

            <List
                spacing={4} 
                w="50%"
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
            >
                {sets.map((set) => {
                    return <ExerciseSet
                        submitting={submitting}
                        key={set.createdAt.toString()}
                        set={set}
                        handleDeleteIconClick={handleDeleteIconClick}
                        handleUpdate={handleUpdate}
                    />
                })}
            </List>
        </>
    )
}