import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Icon,
    Input
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { BiCheck, BiX } from "react-icons/bi"

interface EditFolderNameModalProps {
    isOpen: boolean
    onClose: () => void
    handleSubmit: () => void
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function EditFolderNameModal({isOpen, onClose, handleInputChange, handleSubmit}: EditFolderNameModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        setIsSubmitting(false)
    }, [isOpen])

    const handleSubmitAndSetFormState = () => {
        handleSubmit()
        setIsSubmitting(false)
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={"sm"}
        >
            <ModalOverlay>
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>
                        Rename Folder
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            placeholder="New folder name"
                            onChange={handleInputChange}
                        />
                    </ModalBody>
                    <ModalFooter>
                    <Button
                            disabled={isSubmitting}
                            leftIcon={<Icon as={BiX} />}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            isLoading={isSubmitting}
                            loadingText="Renaming"
                            leftIcon={<Icon as={BiCheck} />}
                            ml={3}
                            onClick={() => {
                                setIsSubmitting(true)
                                handleSubmitAndSetFormState()
                            }}
                        >
                            Confirm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    )
}

