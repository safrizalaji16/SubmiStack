export const getAllByUser = async ({ name, email, phone } = {}) => {
    const url = new URL(`${import.meta.env.VITE_API_URL}/submissions/user`);

    if (name) url.searchParams.set('name', name);
    if (email) url.searchParams.set('email', email);
    if (phone) url.searchParams.set('phone', phone);

    return await fetch(url, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
};

export const getAll = async ({ name, email, phone } = {}) => {
    const url = new URL(`${import.meta.env.VITE_API_URL}/submissions`);

    if (name) url.searchParams.set('name', name);
    if (email) url.searchParams.set('email', email);
    if (phone) url.searchParams.set('phone', phone);

    return await fetch(url, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
};

export const create = async (data) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/submissions`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const get = async (id) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/submissions/${id}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

export const update = async (id, data) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/submissions/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const remove = async (id) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/submissions/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    })
}