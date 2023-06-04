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
                cursor="pointer"
                fontSize={18}
            >
                <ListIcon as={FiFolder}/>
                <Link
                    href={`/workout-folders/${folder.folderName}`}
                >
                    {folder.folderName}
                </Link>
                <ListIcon as={FiChevronRight}/>
            </ListItem>
            <Divider />
        </>
    )
}