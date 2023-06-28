const deleteUser = async (id: string | number) => {
    const res = await fetch(`/api/users/${id}`, {
        method: "DELETE"
    })
    return res
}

const create = async (data: {username: string, password: string}) => {
    const res = await fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify(data)
    })
    return res
}

export const userService = {
    deleteUser,
    create
}