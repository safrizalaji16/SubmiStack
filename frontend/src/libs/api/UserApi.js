export const getAll = async () => {
    return await fetch(`${import.meta.env.VITE_API_URL}/users`)
}

export const get = async (id) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`)
}

export const create = async ({ name, email, password, role = 'user' }) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, password, role })
    })
}

export const update = async (id, { name, email, password, role = 'user' }) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, password, role })
    })
}

export const remove = async (id) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
        method: 'DELETE'
    })
}