import { List } from "@chakra-ui/react";
import { FolderExercise } from "@prisma/client";
import FolderExerciseItem from "../FolderExerciseItem/FolderExerciseItem";

interface FolderExercisesProps {
    folderExercises: FolderExercise[]
    handleDeleteIconClick: (exercise: string) => void
}

export default function FolderExercises({folderExercises, handleDeleteIconClick}: FolderExercisesProps) {
    return (
        <List
            spacing={4} 
            w="80%"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            mt={10}
        >
            {folderExercises && folderExercises.map((folderExercise) => {
                return (
                    <FolderExerciseItem
                        key={folderExercise.exercise}
                        exercise={folderExercise.exercise}
                        handleDeleteIconClick={handleDeleteIconClick}
                    />
                )
            })}
        </List>
    )
}