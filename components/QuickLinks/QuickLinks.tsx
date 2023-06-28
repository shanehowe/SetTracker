import {
    Button,
    Divider,
    DrawerBody,
    DrawerFooter,
    List,
    ListIcon,
    ListItem,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { FaUser } from "@react-icons/all-files/fa/FaUser"
import { FaFolder } from "@react-icons/all-files/fa/FaFolder"
import { FiCornerDownLeft } from "@react-icons/all-files/Fi/FiCornerDownLeft"
import { useRouter } from "next/navigation";

interface QuickLinksProps {
    onClose: () => void
    id: number
}

export function QuickLinks({ onClose, id }: QuickLinksProps) {
    const router = useRouter()

    const handlerFoldersClick = () => {
        router.push("/workout-folders")
        onClose()
    }

    const handleAccountClick = () => {
        router.push(`/account/${id}`)
        onClose()
    }

    return (
        <>
            <DrawerBody mt={5}>
                <List spacing={5} fontWeight={"bold"}>
                    <ListItem
                        p={1} 
                        cursor={"pointer"}
                        onClick={handleAccountClick}
                    >
                        <ListIcon
                            as={FaUser}
                            color={"teal.500"}
                            mr={3}
                        />
                        Account
                    </ListItem>
                    <Divider />
                    <ListItem
                        p={1}
                        cursor={"pointer"}
                        onClick={handlerFoldersClick}
                    >
                        <ListIcon as={FaFolder} color={"teal.500"} mr={3}/>
                        Workout folders
                    </ListItem>
                    <Divider />
                    <ListItem
                        p={1}
                        onClick={async () => await signOut()}
                        cursor={"pointer"}
                    >
                        <ListIcon as={FiCornerDownLeft} color={"teal.500"} mr={3}/>
                        Sign out
                    </ListItem>
                </List>
            </DrawerBody>

            <DrawerFooter>
                <Button onClick={onClose}>Close</Button>
            </DrawerFooter>
        </>
    )
}