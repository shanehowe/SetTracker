import { 
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay 
} from "@chakra-ui/react";


interface AddFolderModalProps {
    isOpen: boolean
    folderName: string
    onClose: () => void
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleCreateFolder: (folderName: string) => void
}

export default function AddFolderModal({ 
    isOpen,
    folderName,
    onClose,
    handleInputChange,
    handleCreateFolder
}: AddFolderModalProps) {
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>Create a new folder</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <Input
                                placeholder="Folder name..."
                                variant="flushed"
                                onChange={handleInputChange}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                ml={3}
                                onClick={() => handleCreateFolder(folderName)}
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