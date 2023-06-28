// app/providers.tsx
"use client"
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { DrawerProvider } from "@/contexts/DrawerContext"; // Import the DrawerProvider

export function Providers({ children, session }: { children: React.ReactNode; session: any }) {
    return (
        <ChakraProvider>
            <SessionProvider session={session}>
                <DrawerProvider> {/* Wrap the children with the DrawerProvider */}
                    {children}
                </DrawerProvider>
            </SessionProvider>
        </ChakraProvider>
    );
}
