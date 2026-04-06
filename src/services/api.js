import axios from "axios";
export const API_URL = import.meta.env.VITE_API_URL;

// function to get eater 
export const getUsers = async () => {
    try {

        const response = await axios.get(`${API_URL}/burgers`);
        return {  allData: response.data }
        

    } catch (error) {
        return { error };
    }      
}
