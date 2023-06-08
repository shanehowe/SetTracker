import { Divider, ListIcon, ListItem, Text } from "@chakra-ui/react"
import { BiXCircle, BiChevronRight } from "react-icons/bi"

interface FolderExerciseItemProps {
    exercise: string
    handleDeleteIconClick: (exercise: string) => void
}

export default function FolderExerciseItem({ exercise, handleDeleteIconClick }: FolderExerciseItemProps) {
    return (
        <>
            <ListItem
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                w={250}
                fontSize={18}
            >
                <ListIcon
                    as={BiXCircle}
                    cursor={"pointer"}
                    onClick={() => {
                        handleDeleteIconClick(exercise)
                    }}
                />
                <Text>{exercise}</Text>
                <ListIcon as={BiChevronRight} />
            </ListItem>
            <Divider />
        </>
    )
}