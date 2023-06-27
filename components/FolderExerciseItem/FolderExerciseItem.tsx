import { Divider, ListIcon, ListItem, Text } from "@chakra-ui/react"
import { BiXCircle } from "@react-icons/all-files/Bi/BiXCircle"
import { BiChevronRight } from "@react-icons/all-files/Bi/BiChevronRight"
import Link from "next/link"

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
                w={280}
                fontSize={18}
            >
                <ListIcon
                    as={BiXCircle}
                    cursor={"pointer"}
                    onClick={() => {
                        handleDeleteIconClick(exercise)
                    }}
                />
                <Link href={`/sets/${exercise}`}>
                    <Text>{exercise}</Text>
                </Link>

                <Link href={`/sets/${exercise}`}>
                    <ListIcon as={BiChevronRight} />
                </Link>
            </ListItem>
            <Divider />
        </>
    )
}