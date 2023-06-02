const url = "/api/exercises"

export async function getAllExercises(): Promise<Response> {
    const res = await fetch(url)
    return res
}