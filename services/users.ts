const deleteUser = async (id: string | number) => {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE"
    })
    return res
}

export const userService = {
    deleteUser
}