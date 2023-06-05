"use client"
import { workoutFolderService } from "@/services/workoutFolders"
import { Button } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

interface PageProps {
    params: {
        folder: string
    }
}

export default function Page({ params }: PageProps) {
    const router = useRouter()
    /*
    *   decodeURI turns Push%20Day to Push Day
    */
    const folder = decodeURIComponent(params.folder)
    const handleDelete = async (id: string) => {
        const folderId = parseInt(folder)
        try {
            const res = await workoutFolderService.deleteFolder(folderId)
            if (res.status === 200) {
                router.push("/workout-folders")
            }
        } catch(e) {
            console.error(e)
        }
    }
    return (
        <>
        <p>From {folder}</p>
        {folder === "All Exercises" ? "" : <Button onClick={() => handleDelete(folder)}>Delete Folder</Button>}
        </>
    )
}