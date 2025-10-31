import { Navigate } from "react-router";
import { useLocalStorage } from "react-use";

export default function PublicRoute({ children }) {
  const [token] = useLocalStorage("token");

  if (token) {
    return <Navigate to="/dashboard/submissions" replace />;
  }

  return children;
}
