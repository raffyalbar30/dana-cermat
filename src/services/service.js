import { EndpointApi } from "./api";

export const SendOTP = async (email_user) => {
     try {
        const response = await EndpointApi.post(`/ResetPassword`, {
             email_user: email_user
        }); 
        return { response : response.data }
     } catch (error) {
          throw error
     }
}