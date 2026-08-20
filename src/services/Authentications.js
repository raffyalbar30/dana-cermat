import { EndpointApi } from "./api";

export const LoginAuth = async (email, password) => {
    try {
        const response = await EndpointApi.post("/Login",
             {
                    email_user: `${email}`, 
                    password_user: `${password}`
             }
            );
        return { response : response}
    } catch (error) {
        throw error
    }
}

export const RegisterAuth = async (email, password, confirmpassword) => {
        try {

        const response = await EndpointApi.post("/Register", {
            email_user: `${email}`, 
            password_user: `${password}`,
            confirm_password: `${confirmpassword}`
        });
        return { response : response}
    } catch (error) {
        throw error
    }
}

export const ResetPassword = async () => {
    
}