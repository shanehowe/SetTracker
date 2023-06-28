"use client"
import {
    Card,
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Icon,
    IconButton,
    Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FiMenu } from "@react-icons/all-files/fi/FiMenu"
import { LogIn } from "../LogIn/LogIn";
import { useContext } from "react";
import { DrawerContext } from "@/contexts/DrawerContext";
import { QuickLinks } from "../QuickLinks/QuickLinks";

export function NavBar() {
    const { data: session, status } = useSession()

    const { toggleDrawer, isDrawerOpen } = useContext(DrawerContext)

    const renderDrawerBody = () => {
        if (status === "loading") {
            return <p>Loading...</p>
        } else if (session === null) {
            return <LogIn onClose={toggleDrawer}/>
        } else {
            return <QuickLinks onClose={toggleDrawer} id={session.user.id} />
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
            bgColor={"white"}
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