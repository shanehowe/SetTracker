import ALlExercises from "@/components/AllExercises/AllExercises"
import FolderExercisesPage from "@/components/FolderExercisesPage/FolderExercisesPage"

interface PageProps {
    params: {
        folder: string
    }
}

export default async function Page({ params }: PageProps) {
    const folderParam = decodeURIComponent(params.folder)
    // maybeFolderId === true ? it is valid ID : All Exercies
    const maybeFolderId = !isNaN(parseInt(folderParam))
    const res = await import("../../api/exercises/route")
    const exercises = await (await res.GET()).json()

    if (maybeFolderId) {
        return <FolderExercisesPage
                    folderId={parseInt(folderParam)}
                    exercises={exercises.data} 
                />
    } else {
        return <ALlExercises exercises={exercises.data} />
    }
}