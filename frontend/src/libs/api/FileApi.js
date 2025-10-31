export const upload = async (data) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/files/uploads`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
}