import axios from "axios";
export const API_URL = import.meta.env.VITE_API_URL;

// function to get eater 
export const EndpointApi = axios.create({
    baseURL : `${API_URL}/API`, 
    headers: {
        "Content-Type" : "application/json"
    }
})


export const LoginAuth = async (email, password) => {
    try {
        const response = await EndpointApi.post("/Login", {
            email_user: email, 
            password_user: password
        });
        console.log(response)
        return { data: response}
    } catch (error) {
        console.log(error);
    }
}

export const FormTransaksi = async(params) => { 
    try {
        const response = await EndpointApi.get(`/Transaksi/v1/getCategories?type_categories=${params}`)
        .then(ress => {
            return ress
         });
        
       return { response: response.data}

    } catch (error) {
        console.log(error);
    }
}

export const AddTransactions = async (token, category, amount, descriptions, date ) => {
    try {
        const response = await EndpointApi.post(`/Transaksi`, {
              id_categories: category,
              amount : amount,
              descriptions : descriptions,
              date : date
        }, {
              headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
         });
    } catch (error) {
        console.log(error); 
    }
}

export const GetAlltransactions = async ( token ) => {
   try {
      const response = await EndpointApi.get(`/Transaksi/v1/getAllTransaksi`, {
        headers: {
            authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
        }
      })
       console.log(response);
      return { response: response.data }
   } catch (error) { 
        console.log(error);
   }
}