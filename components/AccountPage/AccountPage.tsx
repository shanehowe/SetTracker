"use client"
import DeleteModal from "@/components/DeleteModal/DeleteModal";
import { userService } from "@/services/users";
import {
    Avatar,
    Button,
    Flex,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AccountProps {
    id: string
}

export function AccountPage({ id }: AccountProps) {
    const router = useRouter()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { data: session } = useSession()

    const handleDelete = async () => {
        try {
            const res = await userService.deleteUser(id)
            const { data } = await res.json()
            if (res.status === 200) {
                router.push("/")
                signOut()
                toast({
                    status: "success",
                    title: "Account Deleted",
                    description: "We are sad to see you go. Goodbye :(",
                    position: "bottom"
                })
            } else {
                toast({
                    status: "error",
                    title: "Trouble deleting account",
                    description: data,
                    position: "bottom"
                })
            }
        } catch(e) {
            toast({
                status: "error",
                title: "Trouble deleting account",
                description: "Something unexpected happened. Refresh and try again",
                position: "bottom",
                isClosable: true
            })
        }
    }
    return (
        <Flex
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"40vh"}
            mt={10}
        >
            <DeleteModal
                onClose={onClose}
                isOpen={isOpen}
                handleDelete={handleDelete}
                additionalInfo=""
            />
            <Avatar bg={"teal.500"} size={"lg"} />

            <Text mt={2}>{session?.user.username}</Text>

            <Flex flexDir={"column"} alignItems={"center"}>
                <Button mt={10} colorScheme="teal" onClick={() => signOut()}>Sign Out</Button>
                <Button
                    mt={10}
                    colorScheme="red"
                    onClick={onOpen}
                >
                    Delete Account
                </Button>
            </Flex>
        </Flex>
    )
}