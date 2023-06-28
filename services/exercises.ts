/*
    This file will be deleted.
    Instead the route handler will be called directly
    on whatever page it needs as the pages that need
    'all exercies' will be rendered on server. Allows
    response to be cached and reduce API calls.
*/

const url = "/api/exercises"

export async function getAllExercises(): Promise<Response> {
    const res = await fetch(url, {
        method: "GET"
    })
    return res
}