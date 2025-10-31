import { useEffect } from "react";
import { useNavigate } from "react-router";
import { alertInfo } from "../libs/alert";
import { useLocalStorage } from "react-use";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [token] = useLocalStorage("token");

  useEffect(() => {
    if (!token) {
      alertInfo("Please login to access this page");
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return children;
}