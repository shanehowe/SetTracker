/*
* This module will be responsible
* for retrieving and updating sets
* belonging to a specific exercise.
*/
const url = "http://localhost:3000/api/sets"

const getAll = async (exerciseName: string) => {
    const res = await fetch(`${url}/${exerciseName}`)
    return res
}

const post = async (set: WeightSet) => {
    const payload = JSON.stringify(set)
    const res = await fetch(`${url}/${set.exercise}`, {
        method: "POST",
        body: payload
    })
    return res
}

const remove = async (exercise: string, userId: number, createdAt: Date | string) => {

    const res = await fetch(`${url}/${exercise}?userId=${userId}&createdAt=${createdAt}`, {
        method: "DELETE",
    })
    return res
}

export const setsService = {
    getAll,
    post,
    remove
}