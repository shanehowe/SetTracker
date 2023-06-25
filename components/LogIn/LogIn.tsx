import { Button, DrawerBody, DrawerFooter, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LogInProps {
    onClose: () => void
}

export function LogIn({ onClose }: LogInProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()

    const handleSignIn = async (formUsername: string, formPassword: string) => {
        const username = formUsername.trim()
        const password = formPassword.trim()

        if (!username.length || !password.length) {
            return
        }

        setSubmitting(true)

        const signInWasOk = await signIn("credentials", {
            email: username,
            password: password,
            redirect: false
        })

        if (signInWasOk?.ok) {
            router.push("/workout-folders")
        } else {
            console.error(signInWasOk?.error)
        }

        setSubmitting(false)
        onClose()
    }

    return (
        <>
        <DrawerBody>

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