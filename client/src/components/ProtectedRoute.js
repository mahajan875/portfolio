import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // no token → go to login
  if (!token) {
    return <Navigate to="/admin" />;
  }

  try {
    // check token format (JWT has 3 parts)
    if (token.split(".").length !== 3) {
      throw new Error("Invalid token");
    }

    return children;

  } catch {
    localStorage.removeItem("token");
    return <Navigate to="/admin" />;
  }
}