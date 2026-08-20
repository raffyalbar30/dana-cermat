import { EndpointApi } from "./api";

export const SendOTP = async (email_user) => {
     try {
        const response = await EndpointApi.post(`/ResetPassword`, {
             email_user: email_user
        }); 
        return { response : response }
     } catch (error) {
          throw error
     }
}

export const VerifyOTP = async (email_user, OTP) => {
   try {
       const response = await EndpointApi.post(`/verify/ResetPassword`, {
          email_user : email_user, 
          OTP : OTP
       })
       return { response: response}
   } catch (error) {
        throw error
   }
}