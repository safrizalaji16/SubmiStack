export const login = async ({ email, password }) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
}

export const adminLogin = async ({ email, password }) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/auth/admin/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
}

export const register = async ({ name, email, password }) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
}

export const me = async () => {
    return await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const logout = async () => {
    return await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}   