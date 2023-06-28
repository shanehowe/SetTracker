"use client"
import { Link } from "@chakra-ui/next-js";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { DrawerContext } from "../../contexts/DrawerContext";

export function HomePage() {
    const { toggleDrawer } = useContext(DrawerContext);
    
    return (
        <>
            <Flex w={"100%"} alignItems={"center"} justifyContent={"space-evenly"} height={"30vh"}>

                <Flex h={"100%"} flexDir={"column"} alignItems={"center"} justifyContent={"space-evenly"}>
                    <Heading>SetTracker</Heading>

                    <Text>
                        Track your workouts with ease.
                    </Text>

                    <Button colorScheme="teal" onClick={toggleDrawer}>
                        Sign In
                    </Button>

                    <Text>Don&lsquo;t have an account? <Link color="teal.600" href={"/signup"}>Sign up here.</Link></Text>
                </Flex>
            </Flex>
        </>
    )
}
