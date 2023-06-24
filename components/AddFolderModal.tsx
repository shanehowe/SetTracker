import { 
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, 
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ExerciseCheckboxList } from "./ExerciseCheckBoxList/ExerciseCheckBoxList";


interface AddFolderModalProps {
    exercises: Exercise[]
    isOpen: boolean
    folderName: string
    isSubmitting: boolean
    onClose: () => void
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleCreateFolder: (folderName: string, exercises: string[]) => void
}

type Exercise = {
    id: number,
    name: string
}

export default function AddFolderModal({
    exercises,
    isOpen,
    folderName,
    onClose,
    handleInputChange,
    handleCreateFolder,
    isSubmitting
}: AddFolderModalProps) {
    const [exercisesForFolder, setexercisesForFolder] = useState<string[]>([]);

    useEffect(() => {
        setexercisesForFolder([])
    }, [isOpen])

    const handleExerciseClick = (exercise: string): void => {
        if (exercisesForFolder.includes(exercise)) {
            const filtered = exercisesForFolder.filter((e) => e !== exercise);
            setexercisesForFolder(filtered);
            return
        }
        setexercisesForFolder(exercisesForFolder.concat(exercise))
    }


    const handleSubmit = async () => {
        handleCreateFolder(folderName, exercisesForFolder)
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                scrollBehavior={"inside"}
            >
                <ModalOverlay>
                    <ModalContent maxHeight={"60%"}>
                        <ModalHeader>
                            <Input
                                placeholder="Folder name..."
                                variant="flushed"
                                onChange={handleInputChange}
                            />
                        </ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <ExerciseCheckboxList 
                                exercises={exercises}
                                handleExerciseClick={handleExerciseClick}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                isLoading={isSubmitting}
                                loadingText="Creating"
                                ml={3}
                                onClick={() => {
                                    handleSubmit()
                                }}
                            >
                                Create Folder
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    )
}