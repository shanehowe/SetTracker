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

const weightliftingExercises = [
    "Barbell Bench Press",
    "Squat",
    "Deadlift",
    "Dumbbell Shoulder Press",
    "Barbell Rows",
    "Pull-ups",
    "Barbell Curl",
    "Tricep Dips",
    "Lunges",
    "Leg Press",
    "Calf Raises",
    "Incline Dumbbell Press",
    "Romanian Deadlift",
    "Lat Pulldown",
    "Seated Cable Row",
    "Hammer Curls",
    "Skull Crushers",
    "Front Squat",
    "Overhead Press",
    "Bent-Over Rows"
  ];

export default function AddFolderModal({ 
    isOpen,
    folderName,
    onClose,
    handleInputChange,
    handleCreateFolder
}: AddFolderModalProps) {
    const [exercises, setExercises] = useState<string[]>([]);

    useEffect(() => {
        setExercises([])
    }, [isOpen])

    const handleExerciseClick = (exercise: string): void => {
        if (exercises.includes(exercise)) {
            const filtered = exercises.filter((e) => e !== exercise);
            setExercises(filtered);
            return
        }
        setExercises(exercises.concat(exercise))
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                scrollBehavior={"inside"}
            >
                <ModalOverlay>
                    <ModalContent>
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
                                    {weightliftingExercises.map((exercise) => {
                                        return (
                                            <Checkbox
                                                value={exercise}
                                                key={exercise}
                                                onChange={() => handleExerciseClick(exercise)}
                                            >
                                                {exercise}
                                            </Checkbox>
                                        )
                                    })}
                                </Stack>
                            </CheckboxGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                ml={3}
                                onClick={() => handleCreateFolder(folderName, exercises)}
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