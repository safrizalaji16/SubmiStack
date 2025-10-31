import { useEffect } from "react"
import { useNavigate } from "react-router"
import { logout } from "../../libs/api/AuthApi"
import { useLocalStorage } from "react-use"
import { alertError, alertSuccess } from "../../libs/alert"

export default function AuthLogout() {
    const navigate = useNavigate()

    const [token, setToken] = useLocalStorage("token", null)

    async function handleLogout() {
        const response = await logout()
        const data = await response.json()
        console.log(data, "awhj");

        if (data.errors === null) {
            setToken(null)
            await alertSuccess(data.message)
            navigate("/login")
        } else {
            await alertError(data.errors)
            return
        }
    }

    useEffect(() => {
        handleLogout()
    }, [])

}