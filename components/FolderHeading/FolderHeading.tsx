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

interface FolderHeadingProps {
    folder: {
        folderId: number
        folderName: string
    },
    handleDelete: (id: number) => void
}

export default function FolderHeading({folder, handleDelete}: FolderHeadingProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Flex dir="row" alignItems={"center"}>
                    <Menu>
                        <MenuButton
                            w={200}
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
                            <MenuItem icon={<Icon as={BiEdit} />}>Edit folder name</MenuItem>
                            <MenuItem icon={<Icon as={BiPlus} />}>Add exercises</MenuItem>
                            <Divider />
                            <MenuItem 
                                color={"red.500"}
                                icon={<Icon color={"red.500"}as={BiTrash}/>}
                                onClick={onOpen}
                            >
                                Delete folder
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    <DeleteModal 
                        onClose={onClose}
                        isOpen={isOpen}
                        handleDelete={handleDelete}
                        folderId={folder.folderId}
                    />
                </Flex>
    )
}