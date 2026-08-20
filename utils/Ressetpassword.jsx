import { Navigate, Outlet, useParams } from "react-router-dom";

export default function Ressetpassword() {
   const {encodedEmail, Otp} = useParams();
   console.log(encodedEmail)
  return encodedEmail ? <Outlet /> : <Navigate to="/Login" replace />;
}