import {
    Button,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiTrash, BiUndo } from "react-icons/bi";

interface DeleteModalProps {
    isOpen: boolean
    additionalInfo: string
    onClose: () => void
    handleDelete: () => void
}

export default function DeleteModal({isOpen, onClose, handleDelete, additionalInfo}: DeleteModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Prevents button from being in constant loading state
    // after a previous delete operation.
    useEffect(() => {
        setIsSubmitting(false)
    }, [isOpen])

    return (
        <Modal 
            isOpen={isOpen}
            onClose={onClose}
            size={"sm"}
            isCentered={true}
        >
            <ModalOverlay>
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>
                        Are you sure you?
                    </ModalHeader>
                    <ModalBody>
                        This action cannot be undone.<br/>
                        {additionalInfo}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            isDisabled={isSubmitting}
                            onClick={onClose}
                            leftIcon={<Icon as={BiUndo} />}
                        >
                            Cancel
                        </Button>

                        <Button
                            isLoading={isSubmitting}
                            loadingText="Deleting"
                            onClick={() => {
                                setIsSubmitting(true)
                                handleDelete()
                            }}
                            color={"white"}
                            bgColor={"red.600"}
                            _hover={{bgColor: "red.800"}}
                            leftIcon={<Icon as={BiTrash} />}
                            ml={3}
                        >
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    )
}