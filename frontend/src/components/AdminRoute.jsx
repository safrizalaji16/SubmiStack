import { Navigate } from "react-router";
import { useLocalStorage } from "react-use";

export default function AdminRoute({ children }) {
    const [token] = useLocalStorage("token");
    const [role] = useLocalStorage("role");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (role !== "admin" && role !== "superAdmin") {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}
