// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react"
import { AppProps } from "next/app"
import Head from "next/head"

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
            </Head>
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        </>
    )
}

export default App;