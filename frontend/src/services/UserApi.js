export const getAllUsers = async (roles = ['admin', 'superAdmin', 'user'], search = '') => {
    if (!Array.isArray(roles)) {
        roles = typeof roles === 'string'
            ? roles.split(',').map(r => r.trim())
            : ['admin', 'superAdmin', 'user'];
    }

    const params = new URLSearchParams();
    roles.forEach(r => params.append('role', r));
    if (search) params.append('search', search);

    return await fetch(`${import.meta.env.VITE_API_URL}/users?${params}`, {
        credentials: 'include',
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