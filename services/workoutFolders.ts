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

const getAll = async () => {
    const res = await fetch(url)
    return res
}

const deleteFolder = async (id: number) => {
    const res = await fetch(`${url}/${id}`,{
        method: "DELETE"
    })
    return res
}

const getOne = async (id: number) => {
    const res = await fetch(`${url}/${id}`)
    return res
}

const deleteExerciseFromFolder = async (id: number, exercise: string) => {
    const res = await fetch(`${url}/${id}/${exercise}`, {
        method: "DELETE"
    })
    return res
}

// Need to change this to accept array of exercises
// to send the API to add them to folder being updated.
const put = async (id: number, newFolderName: string) => {
    const payload = JSON.stringify({ newFolderName })
    const res = await fetch(`${url}/${id}`, {
        method: "PUT",
        body: payload
    })
    return res
}

export const workoutFolderService = {
    create,
    getAll,
    deleteFolder,
    getOne,
    deleteExerciseFromFolder,
    put
}