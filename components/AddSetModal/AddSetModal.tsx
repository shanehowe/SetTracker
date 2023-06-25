import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    FormControl,
    FormLabel,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Input
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface AddSetModalProps {
    isOpen: boolean
    onClose: () => void
    exercise: string
    submitting: boolean
    handleNewSet: (set: WeightSet) => void
}

export function AddSetModal({ isOpen, onClose, exercise, handleNewSet, submitting }: AddSetModalProps) {
    const [weight, setWeight] = useState<number>(0)
    const [reps, setReps] = useState<number>(0)

    useEffect(() => {
        setWeight(0)
        setReps(0)
    }, [isOpen])

    const handleRepsInc = () => setReps(reps + 1)

    const hanldeRepsDec = () => {
        if (reps === 0) {
            return
        }
        setReps(reps - 1)
    }

    const handleRepsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const num = parseInt(e.target.value)
        if (isNaN(num)) {
            setReps(0)
            return
        }
        setReps(num)
    }

    const handleWeightInc = () => setWeight(weight + 0.25)

    const handleWeightDec = () => {
        if (weight === 0) {
            return;
        }
        setWeight(weight - 0.25)
    }

    const handleWeightInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const num = parseInt(e.target.value)
        if (isNaN(num)) {
            setWeight(0)
            return
        }
        setWeight(num)
    }

    const handleClick = () => {
        const set: WeightSet = {
            exercise,
            reps,
            weight,
        }
        handleNewSet(set)
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior="inside"
            size={"sm"}
        >
            <ModalOverlay>
                <ModalContent
                    maxH={450}
                >
                    <ModalCloseButton />
                    <ModalHeader>
                        Add new set
                    </ModalHeader>
                    <ModalBody>
                        <FormControl
                            display={"flex"}
                            flexDir={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <FormLabel>Weight</FormLabel>
                            <InputGroup w={"80%"} display={"flex"} justifyContent={"space-around"}>
                                <InputLeftElement>
                                    <Button onClick={handleWeightInc}>+</Button>
                                </InputLeftElement>
                                <Input
                                    type="text" pattern="[0-9]*"
                                    textAlign={"center"}
                                    w={"60%"}
                                    placeholder="Weight"
                                    value={weight}
                                    onChange={handleWeightInputChange}
                                />
                                <InputRightElement>
                                    <Button onClick={handleWeightDec}>-</Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        <FormControl
                            mt={4}
                            display={"flex"}
                            flexDir={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <FormLabel>Reps</FormLabel>
                            <InputGroup w={"80%"} display={"flex"} justifyContent={"space-around"}>
                            
                                <InputLeftElement>
                                    <Button onClick={handleRepsInc}>+</Button>
                                </InputLeftElement>
                                <Input
                                    type="text" pattern="[0-9]*"
                                    w={"60%"}
                                    placeholder="Reps"
                                    onChange={(handleRepsInputChange)}
                                    value={reps}
                                    textAlign={"center"}
                                />
                                <InputRightElement>
                                    <Button onClick={hanldeRepsDec}>-</Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button
                            ml={3}
                            onClick={handleClick}
                            isLoading={submitting}
                        >
                            Confirm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    )
}