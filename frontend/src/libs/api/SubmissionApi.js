export const getAll = async () => {
    return await fetch(`${import.meta.env.VITE_API_URL}/submissions`)
}

export const create = async (data) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/submissions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const get = async (id) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/submissions/${id}`)
}

export const update = async (id, data) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/submissions/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const remove = async (id) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/submissions/${id}`, {
        method: 'DELETE'
    })
}