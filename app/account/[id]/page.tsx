import { AccountPage } from "@/components/AccountPage/AccountPage";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "SetTracker | Account",
}

interface PageProps {
    params: {
        id: string
    }
}

export default function Page({ params }: PageProps) {
    return (
        <AccountPage id={params.id} />
    )
}