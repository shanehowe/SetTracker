import { Flex, Spinner } from "@chakra-ui/react";

export default function LoadingSpinner() {
    return (
        <Flex 
            w="100%"
            h="100vh"
            flexDir="column" 
            alignItems="center" 
            justifyContent="center"
        >
            <div>
                Loading...
            </div>
            <Spinner />
        </Flex>
    )
}