import { EndpointApi } from "../services/api";


export const LoginAuth = async () => {
    try {
        const ress = await EndpointApi.post("/Login", {
            email_user: "carlotthelinlin@gmail.com", 
            password_user: "Raff12345wwk"
        }); 
      return { data: ress.data }; 
    } catch (error) {
        console.log(error);
    }
}