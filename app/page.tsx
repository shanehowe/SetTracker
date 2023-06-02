"use client"
import { Link } from "@chakra-ui/next-js";
import { Button } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
    const {data: session} = useSession()
    return (
        <>
            <h1>This will be the home page</h1>
            <Link href="/workout-folders">To Workout Folders</Link>
            <div>
                {session ?
                <Button onClick={() => signOut()}>
                    Sign out
                </Button>
                :
                <Button onClick={() => signIn()}>
                    Sign In
                </Button>}
            </div>
        </>
    )
}
