import { Button, DrawerBody, DrawerFooter, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Notification from "../Notification";
import { NotificationStatus } from "@/types/types";

interface LogInProps {
    onClose: () => void
}

export function LogIn({ onClose }: LogInProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [status, setStatus] = useState<NotificationStatus>(undefined)
    const [title, setTitle] = useState("")
    const router = useRouter()

    const onNotificationClose = () => setIsVisible(false)

    const handleSignIn = async (formUsername: string, formPassword: string) => {
        const username = formUsername.trim()
        const password = formPassword.trim()

        if (!username.length || !password.length) {
            return
        }

        setSubmitting(true)

        const signInWasOk = await signIn("credentials", {
            username: username.toLowerCase(),
            password: password,
            redirect: false
        })

        if (!signInWasOk?.error) {
            router.push("/workout-folders")
        } else {
            setIsVisible(true)
            setStatus("error")
            setTitle("Wrong username or password")
            setSubmitting(false)
            console.error(signInWasOk?.error)
            return
        }

        setSubmitting(false)
        onClose()
    }

    return (
        <>
            <DrawerBody>
                <Notification
                    isVisible={isVisible}
                    status={status}
                    title={title}
                    description={""}
                    onClose={onNotificationClose}
                />
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="text"
                        placeholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl>

                <FormControl mt={3}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
            </DrawerBody>

            <DrawerFooter>
                <Button colorScheme="teal" variant='outline' mr={3} onClick={onClose}>
                Cancel
                </Button>
                <Button
                    colorScheme="teal"
                    isLoading={submitting}
                    onClick={async () => {
                        await handleSignIn(username, password)
                    }}
                >
                Sign in
                </Button>
            </DrawerFooter>
        </>
    )
}