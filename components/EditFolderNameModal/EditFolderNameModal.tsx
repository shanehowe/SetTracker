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
import { BiCheck } from "@react-icons/all-files/bi/BiCheck"
import { BiX } from "@react-icons/all-files/bi/BiX"

interface EditFolderNameModalProps {
    isSubmitting: boolean
    isOpen: boolean
    onClose: () => void
    handleSubmit: () => void
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function EditFolderNameModal({
    isOpen,
    onClose,
    handleInputChange,
    handleSubmit,
    isSubmitting
}: EditFolderNameModalProps) {

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
                            focusBorderColor="teal.400"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            disabled={isSubmitting}
                            leftIcon={<Icon as={BiX} />}
                            onClick={onClose}
                            variant={"ghost"}
                            colorScheme="teal"
                        >
                            Cancel
                        </Button>
                        <Button
                            isLoading={isSubmitting}
                            loadingText="Renaming"
                            leftIcon={<Icon as={BiCheck} />}
                            ml={3}
                            onClick={handleSubmit}
                            colorScheme="teal"
                        >
                            Confirm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    )
}

