import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalHeader,
    ModalBody,
    Input,
    ModalFooter,
    Button,
    Icon,
    Box
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ExerciseCheckboxList } from "../ExerciseCheckBoxList/ExerciseCheckBoxList";
import { Exercise, FolderExercise } from "@prisma/client";
import { FiCheck } from "@react-icons/all-files/Fi/FiCheck";
import { FiX } from "@react-icons/all-files/Fi/FiX";

interface AddExercisesModalProps {
    currentFolderExercises: FolderExercise[]
    exercises: Exercise[]
    isOpen: boolean
    onClose: () => void
    handleAddNewExercises: (newExercises: string[]) => void
    isSubmitting: boolean
}

export function AddExercisesModal({
    isOpen,
    onClose,
    exercises,
    currentFolderExercises,
    handleAddNewExercises,
    isSubmitting
}: AddExercisesModalProps) {
    const [searchFilter, setSearchFilter] = useState("")
    // originalExercises is needed to handle searching for exercises
    // if its not there then the search results will include exercises
    // that are already in the current folder.
    const [originalExercises, setOriginalExercices] = useState<Exercise[]>([])
    const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([])
    const [exercisesToAdd, setExercisesToAdd] = useState<string[]>([])
    let searchFilterEmpty = searchFilter=== "" ? true : false

    useEffect(() => {
        const exercisesToShow = []
        for (let i = 0; i < exercises.length; i++) {
            let flag = false;
            for (let j = 0; j < currentFolderExercises.length; j++) {
                if (exercises[i].name === currentFolderExercises[j].exercise) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                exercisesToShow.push(exercises[i])
            }
        }
        setFilteredExercises(exercisesToShow)
        setOriginalExercices(exercisesToShow)
    },[isOpen, searchFilterEmpty, exercises, currentFolderExercises])

    const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchFilter(prev => e.target.value)
        setFilteredExercises(originalExercises.filter((e) => {
            return e.name.toLowerCase().includes(searchFilter)
        }))
    }

    const handleExerciseClick = (exercise: string) => {
        if (exercisesToAdd.includes(exercise)) {
            setExercisesToAdd(exercisesToAdd.filter((e) => e !== exercise))
        } else {
            setExercisesToAdd(exercisesToAdd.concat(exercise))
        }
    }

    const handleConfirmClick = () => {
        handleAddNewExercises(exercisesToAdd)
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior="inside"
        >
            <ModalOverlay>
                <ModalContent
                    maxH={450}
                >
                    <ModalCloseButton />
                    <ModalHeader>
                        Add Exercises To Folder
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            placeholder="Search exercises here"
                            mb={5}
                            onChange={onFilterChange}
                        />
                        <Box maxH={350} overflow={"scroll"}>
                            <ExerciseCheckboxList
                                exercises={filteredExercises}
                                handleExerciseClick={handleExerciseClick}
                            />
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={onClose} 
                            leftIcon={<Icon as={FiX} />}
                        >
                                Cancel</Button>
                        <Button
                            ml={3}
                            onClick={handleConfirmClick}
                            isLoading={isSubmitting}
                            loadingText="Working on it"
                            leftIcon={<Icon as={FiCheck} />}
                        >
                            Confirm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    )
}