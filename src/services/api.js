import axios from "axios";
export const API_URL = import.meta.env.VITE_API_URL;

// approve credentials for approve cookie
export const EndpointApi = axios.create({
    baseURL : `${API_URL}/API`, 
    withCredentials: true,
    headers: {
        "Content-Type" : "application/json"
    }
});

export const Getcategory = async (type_categories) => { 
    try {
        const response = await EndpointApi.get(`/Transaksi/v1/getCategories`, {
            params: { type_categories }
        });
        return { response: response.data };
    } catch (error) {
        console.error(error);
    }

}

export const AddTransactions = async (token, category, amount, descriptions, date) => {
    try {
        const response = await EndpointApi.post(`/Transaksi/v1/AddTransaksi`, {
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

         return { response : response.data}
    } catch (error) {
        console.log(error); 
    }
}

export const GetAlltransactions = async (token, pages) => {
   try {
      const response = await EndpointApi.get(`/Transaksi/v1/getAllTransaksi?page=${pages}&limit=5`, {
        headers: {
            authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
        }
      })
      console.log(response);
      return { response: response }
   } catch (error) { 
        console.log(error);
   }
}

export const Renametransactions = async (
    RenameIdTransactions,
    id_categories, 
    amount, 
    date,
    descriptions) => {
   try { 
      const response = await EndpointApi.post(`/Transaksi/v1/renameTransaksi`, 
        {
            idtransaction: RenameIdTransactions,
            id_categories : id_categories, 
            amount : amount, 
            date : date, 
            descriptions: descriptions,
        }
      )
      return { response : response}
   } catch (error) {
      console.log(error);
   }
}

export const Dellatetransactions = async ( id ) => {
    try {
        const response = await EndpointApi.post(`/Transaksi/v1/dellateTransaksi`, {
            idtransactions: id,
        })

       return { response: response }
    } catch (error) {
        console.log(error);
    }
}

export const Allcategorybudgets = async () => {
    try {
       const response = await EndpointApi.get(`/Budgets/v1/getAllcategories`); 
       return { response: response.data}
    } catch (error) {
        console.log(error);
    }
}

export const Addbudgets = async (
    token, 
    category,
    amount, 
    periode, 
    StartDate) => {

    try {
        const response = await EndpointApi.post(`/Budgets/v1/addbudgets`, {
            category: category, 
            amount: amount, 
            periode: periode, 
            startdate: StartDate, 
        }, {
         headers: {
            authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
          }
        }); 

        return { response: response.data }
    } catch (error) {
       console.log(error); 
    }
}

export const GetAllbudgets = async (token) => {
    try {
       const response = await EndpointApi.get(`/Budgets/v1/getAllBudgets`, {
           headers: {
            authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
          }
       }); 
       return { response: response.data}
    } catch (error) {
        console.log(error);
    }
}

export const Dellatebudgets = async ( id ) => {
    try {
        const response = await EndpointApi.post(`/Budgets/v1/dellateBudgets`, {
            idBudgets: id,
        })

       return { response: response }
    } catch (error) {
        console.log(error);
    }
}

export const UpdateBudgets = async (
    idcategory,
    amount, 
    period, 
    startdate,
    endDate, 
    idbudgets
) => {
   try { 
      const response = await EndpointApi.post(`/Budgets/v1/updateBudgets`, 
        {
            idcategory: idcategory,
            amount : amount, 
            period : period, 
            startdate : startdate, 
            endDate: endDate,
            idbudgets: idbudgets
        }
      )
      return { response : response}
   } catch (error) {
      console.log(error);
   }
}

export const TotalTransaction = async (token) => {
    try {
        const response = await EndpointApi.get(`/TotalTransaksi`, 
             {
              headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
         })

         return { response : response.data}
    } catch (error) {
        console.log(error);
    }
}

export const TotalBudget = async (token) => {
    try {
        const response = await EndpointApi.get(`/TotalBudgets`, 
             {
              headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
         })

         return { response : response.data}
    } catch (error) {
        console.log(error);
    }
}