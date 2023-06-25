"use client"
import { Link } from "@chakra-ui/next-js";
import { Button } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import { DrawerContext } from "../Contexts/DrawerContext";

export default function Home() {
    const {data: session} = useSession()
    const { toggleDrawer } = useContext(DrawerContext);
    
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
                    <Button onClick={toggleDrawer}>
                    Sign In
                    </Button>}
            </div>
        </>
    )
}
