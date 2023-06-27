"use client"

import { 
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react"
import { useRouter } from "next/navigation";
import { useState } from "react"
import Notification from "../Notification"
import styles from "./styles.module.css"
import { NotificationStatus } from "@/types/types";
import { signIn } from "next-auth/react";

export default function SignUpForm({}) {
    const [notificationStatus, setNotifcationStatus] = useState<NotificationStatus>(undefined)
    const [notificationVisible, setNotifcationVisible] = useState<boolean>(false)
    const [notificationDesc, setNotificationDesc] = useState<string>("")
    const [notificationTitle, setNotificationTitle] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const router = useRouter()

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(e.currentTarget.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.currentTarget.value)
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setConfirmPassword(e.currentTarget.value)
    }

    const onNotificationClose = (): void => setNotifcationVisible(false)

    const handleSignUp = async (username: string, password: string) => {
        setIsSubmitting(true)

        if (password !== confirmPassword) {
            setNotifcationStatus("error")
            setNotificationTitle("Password miss-match")
            setNotificationDesc("Your passwords fields do not match. Correct this to complete sign up")
            setNotifcationVisible(true)
            setIsSubmitting(false)
            return
        }
        const data = {
            username: username.trim().toLocaleLowerCase(),
            password: password
        }

        if (!data.username) {
            setNotifcationStatus("warning")
            setNotificationTitle("Missing Value")
            setNotificationDesc("Please fill out the username section to complete the sign up")
            setNotifcationVisible(true)
            setIsSubmitting(false)
            return
        } else if (!data.password) {
            setNotifcationStatus("warning")
            setNotificationTitle("Missing Value")
            setNotificationDesc("Please fill out the password section to complete the sign up")
            setNotifcationVisible(true)
            setIsSubmitting(false)
            return
        }

        try {
            const response = await fetch("/api/users/signup", {
                method: "POST",
                body: JSON.stringify(data)
            })
            const res = await response.json()

            if (response.status !== 200) {
                setNotifcationStatus("error")
                setNotificationTitle(res.message)
                setNotificationDesc("")
                setNotifcationVisible(true)
                setIsSubmitting(false)
                return
            }
            
            setNotifcationStatus("success")
            setNotificationTitle("Account created!")
            setNotificationDesc("You account has been created. Welcome to SetTracker!")
            setNotifcationVisible(true)
            setIsSubmitting(false)

            await signIn("credentials", {
                redirect: false,
                username: username,
                password: password
            })
            router.push("/workout-folders")
        } catch (error) {
            console.error(error)
            setNotifcationStatus("error")
            setNotificationTitle("Something unexpected happened")
            setNotificationDesc("An error occured, we are not sure what. Try again later")
            setNotifcationVisible(true)
            setIsSubmitting(false)
        }
    }

    return (
        <section className={styles.formContainer}>
            <Card>
                <CardHeader
                    textAlign="center"
                    fontWeight="bold"
                    fontSize={"xl"}
                >
                        Create your account
                </CardHeader>
                <Flex w="100%" justifyContent={"center"}>
                    <Notification
                        status={notificationStatus}
                        isVisible={notificationVisible}
                        title={notificationTitle}
                        description={notificationDesc}
                        onClose={onNotificationClose}
                    />
                </Flex>
                <CardBody>
                    <FormControl isRequired mt={5}>
                        <FormLabel>Username</FormLabel>
                        <Input
                            placeholder="Your username"
                            onChange={handleUsernameChange}
                            focusBorderColor="teal.200"
                        />
                    </FormControl>
                    
                    <FormLabel mt={5}>Password</FormLabel>
                    <Input
                        placeholder="Password"
                        type="password"
                        onChange={handlePasswordChange}
                        focusBorderColor="teal.200"
                    />

                    <FormControl mt={5}>
                        <FormLabel>Confirm password</FormLabel>
                        <Input 
                            placeholder="Confirm password"
                            type="password" 
                            onChange={handleConfirmPasswordChange}
                            focusBorderColor="teal.200"
                        />
                    </FormControl>

                    <Flex justifyContent="center" alignItems="center" mt={5}>
                        <Button
                            isDisabled={isSubmitting ? true : false}
                            onClick={() => {
                                handleSignUp(username, password)
                            }}
                            colorScheme="teal"
                        >
                            Sign Up
                        </Button>
                    </Flex>
                </CardBody>
            </Card>
        </section>
    )
}