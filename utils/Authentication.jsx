// components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = sessionStorage.getItem("Token");
  return token ? <Outlet /> : <Navigate to="/Login" replace />;
}

