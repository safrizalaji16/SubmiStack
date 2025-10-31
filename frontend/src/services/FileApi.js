export const upload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return await fetch(`${import.meta.env.VITE_API_URL}/files/uploads`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
}