"use client"
import { Link } from "@chakra-ui/next-js";


export default function Home() {
    return (
        <>
            <h1>This will be the home page</h1>
            <Link href="/workout-folders">To Workout Folders</Link>
        </>
    )
}
