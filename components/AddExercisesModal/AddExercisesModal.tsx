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
import { FolderExercise } from "@prisma/client";

interface AddExercisesModalProps {
    currentFolderExercises: FolderExercise[]
    exercises: Exercise[]
    isOpen: boolean
    onClose: () => void
}

export function AddExercisesModal({ isOpen, onClose, exercises, currentFolderExercises }: AddExercisesModalProps) {
    const [searchFilter, setSearchFilter] = useState("")
    // originalExercises is needed to handle searching for exercises
    // if its not there then the search results will include exercises
    // that are already in the current folder.
    const [originalExercises, setOriginalExercices] = useState<Exercise[]>([])
    const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([])
    const [exercisesToAdd, setExercisesToAdd] = useState<string[]>([])

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
    },[isOpen, searchFilter === ""])

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
                        <Button onClick={onClose}>Cancel</Button>
                        <Button ml={3}>Confirm</Button>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    )
}