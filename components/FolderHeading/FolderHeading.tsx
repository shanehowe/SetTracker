import {
    Divider,
    Flex,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useDisclosure
} from "@chakra-ui/react"
import { BiChevronDown, BiEdit, BiFolderOpen, BiPlus, BiTrash } from "react-icons/bi";
import DeleteModal from "../DeleteModal/DeleteModal";
import { AddExercisesModal } from "../AddExercisesModal/AddExercisesModal";
import { FolderExercise } from "@prisma/client";

interface FolderHeadingProps {
    currentFolderExercises: FolderExercise[]
    exercises: Exercise[]
    folder: {
        folderId: number
        folderName: string
    },
    handleDelete: () => void
    onEditFolderNameOpen: () => void
    handleAddNewExercises: (newExercises: string[]) => void
    addNewExercisesOpen: boolean
    onAddNewExercisesClose: () => void
    onAddNewExercisesOpen: () => void
    isSubmitting: boolean
}

export default function FolderHeading({
    exercises,
    folder,
    handleDelete,
    onEditFolderNameOpen,
    currentFolderExercises,
    handleAddNewExercises,
    addNewExercisesOpen,
    onAddNewExercisesClose,
    onAddNewExercisesOpen,
    isSubmitting
}: FolderHeadingProps) {

    const deleteFolderDisclosure = useDisclosure()

    return (
        <Flex dir="row" alignItems={"center"}>
                    <Menu>
                        <MenuButton
                            w={250}
                            px={6}
                            py={2}
                            transition='all 0.2s'
                            borderRadius='md'
                            borderWidth='1px'
                            _hover={{ bg: 'gray.400' }}
                            _expanded={{ bg: 'blue.400' }}
                            _focus={{ boxShadow: 'outline' }}
                        >
                            <Flex alignItems={"center"} justifyContent={"space-between"} w={"100%"}>
                                <Icon as={BiFolderOpen} height={18} width={18}/>
                                <Text fontSize={21}>{folder.folderName}</Text>
                                <Icon as={BiChevronDown}/>
                            </Flex>
                            
                        </MenuButton>

                        <MenuList>
                            <MenuItem
                                onClick={onEditFolderNameOpen}
                                icon={<Icon as={BiEdit} />}
                            >
                                Edit folder name
                            </MenuItem>
                            <MenuItem
                                onClick={onAddNewExercisesOpen}
                                icon={<Icon as={BiPlus} />}
                            >
                                Add exercises
                            </MenuItem>
                            <Divider />
                            <MenuItem 
                                color={"red.500"}
                                icon={<Icon color={"red.500"}as={BiTrash}/>}
                                onClick={deleteFolderDisclosure.onOpen}
                            >
                                Delete folder
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    <DeleteModal 
                        onClose={deleteFolderDisclosure.onClose}
                        isOpen={deleteFolderDisclosure.isOpen}
                        handleDelete={handleDelete}
                        folderId={folder.folderId}
                        additionalInfo="You will be redirected back to your workout folders"
                    />
                    <AddExercisesModal
                        handleAddNewExercises={handleAddNewExercises}
                        currentFolderExercises={currentFolderExercises}
                        onClose={onAddNewExercisesClose}
                        isOpen={addNewExercisesOpen}
                        exercises={exercises}
                        isSubmitting={isSubmitting}
                    />
                </Flex>
    )
}