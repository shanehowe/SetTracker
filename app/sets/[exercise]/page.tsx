import SetsPage from "@/components/SetsPage/SetsPage";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "SetTracker | Sets",
    description: "set history",
}

interface PageProps {
    params: {
        exercise: string
    }
}

export default function Page({ params }: PageProps) {
    return (
        <SetsPage exerciseFromUrl={params.exercise} />
    )
}