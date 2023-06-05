import { Divider, Link, ListIcon, ListItem } from "@chakra-ui/react"
import { FiChevronRight, FiFolder } from "react-icons/fi"

interface WorkoutFolderProps {
    folder: ExerciseFolder
}

export default function WorkoutFolder({ folder }: WorkoutFolderProps) {
    return (
        <>
            <ListItem 
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                w={250}
                fontSize={18}
            >
                <ListIcon as={FiFolder} cursor="pointer"/>
                <Link
                    href={`/workout-folders/${folder.id}`}
                >
                    {folder.folderName}
                </Link>
                <ListIcon as={FiChevronRight}/>
            </ListItem>
            <Divider />
        </>
    )
}