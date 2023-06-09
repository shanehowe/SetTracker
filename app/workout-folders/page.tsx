// import FoldersPage from "@/components/FoldersPage/FoldersPage"
import { Metadata } from "next"
import dynamic from "next/dynamic"

const FoldersPage = dynamic(() => import("../../components/FoldersPage/FoldersPage"))

export const metadata: Metadata = {
    title: "SetTracker | Folders",
    description: "Access your workout folders",
}

export default async function Page() {
    const res = await import("../api/exercises/route")
    const exercises = await (await res.GET()).json()

    return (
        <>
            <FoldersPage exercises={exercises.data} />
        </>
    )
}