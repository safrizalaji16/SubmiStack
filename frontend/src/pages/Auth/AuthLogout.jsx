import { useEffect } from "react"
import { useNavigate } from "react-router"
import { logout } from "../../services/AuthApi"
import { alertError, alertSuccess } from "../../libs/alert"
import { useLocalStorage } from "react-use";
import Cookies from "js-cookie";

export default function AuthLogout() {
    const [, , removeToken] = useLocalStorage("token");
    const [, , removeRole] = useLocalStorage("role");
    const navigate = useNavigate()

    async function handleLogout() {
        const response = await logout()
        const data = await response.json()

        if (data.errors === null) {
            Cookies.remove();
            removeToken();
            removeRole();
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