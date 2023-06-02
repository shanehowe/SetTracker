// app/providers.tsx
"use client"

import { CacheProvider } from "@chakra-ui/next-js"
import { ChakraProvider } from "@chakra-ui/react"
import { SessionProvider } from 'next-auth/react'

export function Providers({ children, session }: { children: React.ReactNode, session: any }) {
    return (
        <CacheProvider>
            <ChakraProvider>
                <SessionProvider session={session}>
                {children}
                </SessionProvider>
            </ChakraProvider>
        </CacheProvider>
    )
}