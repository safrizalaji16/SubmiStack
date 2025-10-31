export const getAllUsers = async (query = {}) => {
    const queryString = new URLSearchParams(query).toString();

    const url = `${import.meta.env.VITE_API_URL}/users${queryString ? `?${queryString}` : ''}`;

    return await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};


export const get = async (id) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
        credentials: 'include'
    })
}

export const create = async ({ name, email, password, role = 'user' }) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        credentials: 'include',
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
        method: 'DELETE',
        credentials: 'include'
    })
}