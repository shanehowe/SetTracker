"use client"
import {
    Button,
    Card,
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Icon,
    IconButton,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { FiMenu } from "@react-icons/all-files/fi/FiMenu"
import { LogIn } from "../LogIn/LogIn";
import { useContext } from "react";
import { DrawerContext } from "@/Contexts/DrawerContext";

export function NavBar() {
    const { data: session, status } = useSession()

    const { toggleDrawer, isDrawerOpen } = useContext(DrawerContext)

    const renderDrawerBody = () => {
        if (status === "loading") {
            return <p>Loading...</p>
        } else if (status === "unauthenticated") {
            return <LogIn onClose={toggleDrawer}/>
        } else {
            return <Button onClick={async () => await signOut()}>Sign Out</Button>
        }
    }

    return (
        <Card
            pos={"sticky"}
            top={"0"}
            w={"100%"}
            display={"flex"}
            flexDir={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            p={3}
        >
            <Text fontSize={20} fontWeight={"bold"}>
                Set<span style={{color: "teal"}}>Tracker</span>
            </Text>

            <IconButton
                icon={<Icon as={FiMenu} />} 
                aria-label="Open menu"
                onClick={toggleDrawer}
                colorScheme="teal"
            />
            <Drawer
                isOpen={isDrawerOpen}
                placement='right'
                onClose={toggleDrawer}
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>{status === "unauthenticated" ? "Sign in" : "Quick Links"}</DrawerHeader>
                    {renderDrawerBody()}
                </DrawerContent>
            </Drawer>
        </Card>
    )
}