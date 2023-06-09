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
    Icon
} from "@chakra-ui/react";
import { useState } from "react";
import { ExerciseCheckboxList } from "../ExerciseCheckBoxList/ExerciseCheckBoxList";

interface AddExercisesModalProps {
    isOpen: boolean
    onClose: () => void
}

export function AddExercisesModal({ isOpen, onClose }: AddExercisesModalProps) {
    const [searchFilter, setSearchFilter] = useState("")
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay>
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>
                        Add Exercises To Folder
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            placeholder="Search exercises here"
                            mb={2}
                        />
                        <ExerciseCheckboxList
                            exercises={[]}
                            handleExerciseClick={setSearchFilter}
                         />
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    )
}