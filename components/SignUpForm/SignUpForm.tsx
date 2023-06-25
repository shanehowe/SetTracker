"use client"

import { 
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
} from "@chakra-ui/react"
import { useRouter } from "next/navigation";
import { useState } from "react"
import Notification from "../Notification"
import styles from "./styles.module.css"

export default function SignUpForm({}) {
    const [notificationStatus, setNotifcationStatus] = useState<NotificationStatus>(undefined)
    const [notificationVisible, setNotifcationVisible] = useState<boolean>(false)
    const [notificationDesc, setNotificationDesc] = useState<string>("")
    const [notificationTitle, setNotificationTitle] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const router = useRouter()

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.currentTarget.value)
    }

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

    const handleSignUp = async (email: string, username: string, password: string) => {
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
            email: email.trim().toLocaleLowerCase(),
            username: username.trim().toLocaleLowerCase(),
            password: password
        }

        if (!data.email) {
            setNotifcationStatus("warning")
            setNotificationTitle("Missing Value")
            setNotificationDesc("Please fill out the email section to complete the sign up")
            setNotifcationVisible(true)
            setIsSubmitting(false)
            return
        } else if (!data.username) {
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

            router.push("/")
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
                <CardHeader textAlign="center" fontWeight="bold">Sign Up</CardHeader>
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
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            placeholder="Your email"
                            onChange={handleEmailChange}
                        />
                        <FormHelperText>We will never share your email with anyone else</FormHelperText>
                    </FormControl>

                    <FormControl isRequired mt={5}>
                        <FormLabel>Username</FormLabel>
                        <Input
                            placeholder="Your username"
                            onChange={handleUsernameChange}
                        />
                    </FormControl>
                    
                    <FormLabel mt={5}>Password</FormLabel>
                    <Input
                        placeholder="Password"
                        type="password"
                        onChange={handlePasswordChange}
                    />

                    <FormControl mt={5}>
                        <FormLabel>Confirm password</FormLabel>
                        <Input 
                            placeholder="Confirm password"
                            type="password" 
                            onChange={handleConfirmPasswordChange}
                        />
                    </FormControl>

                    <Flex justifyContent="center" alignItems="center" mt={5}>
                        <Button
                            isDisabled={isSubmitting ? true : false}
                            onClick={() => {
                                handleSignUp(email, username, password)
                            }}
                        >
                            Sign Up
                        </Button>
                    </Flex>
                </CardBody>
            </Card>
        </section>
    )
}