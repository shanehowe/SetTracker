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
import { useState } from "react";
import { ExerciseCheckboxList } from "../ExerciseCheckBoxList/ExerciseCheckBoxList";

interface AddExercisesModalProps {
    exercises: Exercise[]
    isOpen: boolean
    onClose: () => void
}

export function AddExercisesModal({ isOpen, onClose, exercises }: AddExercisesModalProps) {
    const [searchFilter, setSearchFilter] = useState("")
    const [filteredExercises, setFilteredExercises] = useState<Exercise[]>(exercises)

    const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Filter
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
                            onChange={(e) => setSearchFilter(e.target.value)}
                        />
                        <Box maxH={350} overflow={"scroll"}>
                            <ExerciseCheckboxList
                                exercises={filteredExercises}
                                handleExerciseClick={setSearchFilter}
                            />
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    )
}