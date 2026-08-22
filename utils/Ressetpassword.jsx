import { Navigate, Outlet, useSearchParams } from "react-router-dom";

export default function Ressetpassword() {
   const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const otp = searchParams.get("OTP");

  return email && otp ? <Outlet /> : <Navigate to="/Login" replace />;
}