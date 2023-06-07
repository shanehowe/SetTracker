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
import { useState } from "react";
import { BiTrash, BiUndo } from "react-icons/bi";

interface DeleteModalProps {
    folderId: number
    isOpen: boolean
    onClose: () => void
    handleDelete: (id: number) => void
}

export default function DeleteModal({isOpen, onClose, handleDelete, folderId}: DeleteModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
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
                        You cannot undo this action. You will be redirected back to your workout folders.
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
                                handleDelete(folderId)
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