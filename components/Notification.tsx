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
        <Alert status={status} width="max-content" mt={10}>
            <AlertIcon />
            <Box>
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