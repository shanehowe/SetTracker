const url = "/api/workout-folders"

const create = async (folderName: string, linkedExercises: string[]) => {
    const payload = JSON.stringify({
        folderName,
        linkedExercises
    })
    const res = await fetch(url, {
        method: "POST",
        body: payload,
    })
    return res
}

export const workoutFolderService = {
    create
}