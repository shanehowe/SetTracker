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
    InputRightElement
} from "@chakra-ui/react"
import { useState } from "react"
import Notification from "../Notification"

import styles from "./styles.module.css"

export default function SignUpForm({}) {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [notificationStatus, setNotifcationStatus] = useState<NotificationStatus>(undefined)
    const [notificationVisible, setNotifcationVisible] = useState<boolean>(false)
    const [notificationDesc, setNotificationDesc] = useState<string>("")
    const [notificationTitle, setNotificationTitle] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const handleClick = (): void => {
        setShowPassword(!showPassword)
    }

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

    return (
        <section className={styles.formContainer}>
            <Card>
                <CardHeader textAlign="center" fontWeight="bold">Sign Up</CardHeader>
                <Notification 
                    status={notificationStatus}
                    isVisible={notificationVisible}
                    title={notificationTitle}
                    description={notificationDesc}
                    onClose={() => {}}
                />
                <CardBody>
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            placeholder="Your email"
                            onChange={handleEmailChange}
                        />
                        <FormHelperText>We'll never share your email with anyone else</FormHelperText>
                    </FormControl>

                    <FormControl isRequired mt={5}>
                        <FormLabel>Username</FormLabel>
                        <Input
                            placeholder="Your username"
                            onChange={handleUsernameChange}
                        />
                    </FormControl>
                    
                    <FormLabel mt={5}>Password</FormLabel>
                    <InputGroup>
                        <Input
                            pr="4.5rem"
                            placeholder="Password"
                            type="password"
                            onChange={handlePasswordChange}
                        />
                        <InputRightElement w="4.7rem">
                            <Button h="1.75rem" onClick={handleClick}>
                                {showPassword ? "hide" : "show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>

                    <FormControl mt={5}>
                        <FormLabel>Confirm password</FormLabel>
                        <Input placeholder="Confirm password" type="password" />
                    </FormControl>

                    <Flex justifyContent="center" alignItems="center" mt={5}>
                        <Button>Sign Up</Button>
                    </Flex>
                </CardBody>
            </Card>
        </section>
    )
}