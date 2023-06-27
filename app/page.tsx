import { HomePage } from "@/components/HomePage/HomePage";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "SetTracker | Home",
    description: "Home page of set tracker.",
}

export default function Home() {
    
    return (
        <>
            <HomePage/>
        </>
    )
}
