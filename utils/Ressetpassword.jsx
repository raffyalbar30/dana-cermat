import { useEffect } from "react";
import { Navigate, Outlet, useNavigate, useSearchParams } from "react-router-dom";

export default function Ressetpassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const email = searchParams.get("email");
    const otp = searchParams.get("OTP");

    useEffect(() => {
        if (!email || !otp) return;

        const timer = setTimeout(() => {
            navigate("/Login", { replace: true });
        }, 15 * 60 * 1000);

        return () => clearTimeout(timer);
    }, [email, otp, navigate]);

    if (!email || !otp) {
        return <Navigate to="/Login" replace />;
    }

    return <Outlet />;
}