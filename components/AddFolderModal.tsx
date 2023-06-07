import { getAllExercises } from "@/services/exercises";
import { 
    Button,
    Checkbox,
    CheckboxGroup,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, 
    Spinner, 
    Stack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";


interface AddFolderModalProps {
    isOpen: boolean
    folderName: string
    onClose: () => void
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleCreateFolder: (folderName: string, exercises: string[]) => void
}

type Exercise = {
    id: number,
    name: string
}

export default function AddFolderModal({ 
    isOpen,
    folderName,
    onClose,
    handleInputChange,
    handleCreateFolder
}: AddFolderModalProps) {
    const [exercisesForFolder, setexercisesForFolder] = useState<string[]>([]);
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        setexercisesForFolder([])
    }, [isOpen])

    useEffect(() => {
        getAllExercises()
            .then(res => res.json())
            .then(r => setExercises(r.data))
            .catch(e => console.error(e))
    }, [])

    const handleExerciseClick = (exercise: string): void => {
        if (exercisesForFolder.includes(exercise)) {
            const filtered = exercisesForFolder.filter((e) => e !== exercise);
            setexercisesForFolder(filtered);
            return
        }
        setexercisesForFolder(exercisesForFolder.concat(exercise))
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
                            
                            <CheckboxGroup>
                                <Stack spacing={[1, 5]} direction={"column"}>
                                    { exercises ? exercises.map((exercise) => {
                                        return (
                                            <Checkbox
                                                value={exercise.name}
                                                key={exercise.id}
                                                onChange={() => handleExerciseClick(exercise.name)}
                                            >
                                                {exercise.name}
                                            </Checkbox>
                                        )
                                    }) : <Spinner/>}
                                </Stack>
                            </CheckboxGroup>
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
                                    setIsSubmitting(true)
                                    handleCreateFolder(folderName, exercisesForFolder)
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