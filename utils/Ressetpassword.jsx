import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate, useSearchParams } from "react-router-dom";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(null); // null = belum dicek

    const email = searchParams.get("email");
    const otp = searchParams.get("OTP");

    useEffect(() => {
        const stored = sessionStorage.getItem("tokennewpassword");

        if (!stored) {
            setIsValid(false);
            return;
        }

        try {
            const data = JSON.parse(stored);
            const expired = new Date() > new Date(data.dateEXP);
            setIsValid(!expired);
        } catch {
            setIsValid(false);
        }
    }, []);

    if (!email || !otp) {
        return <Navigate to="/Login" replace />;
    }

    if (isValid === false) return <Navigate to="/Login" replace />;

    return <Outlet />;
}