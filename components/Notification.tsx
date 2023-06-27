import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton } from "@chakra-ui/react"

interface NotifcationProps {
    status: "info" | "warning" | "success" | "error" | "loading" | undefined
    isVisible: boolean
    title: string
    description: string
    onClose: () => void
}

export default function Notification({
    status,
    isVisible,
    title,
    description,
    onClose
}: NotifcationProps) {

    if (!isVisible) {
        return null
    }

    return (
        <Alert status={status}  mt={5}>
            <AlertIcon />
            <Box w={"100%"}>
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>
                    {description}
                </AlertDescription>
            </Box>
            <CloseButton 
                alignSelf='flex-start'
                position='relative'
                right={-1}
                top={-1}
                onClick={onClose}
            />
        </Alert>
    )
}