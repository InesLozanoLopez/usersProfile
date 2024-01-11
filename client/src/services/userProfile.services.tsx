import axios from "axios";
import { toast } from "react-toastify";
import { authHeader } from "./auth.header.tsx";

const API_URL = 'http://localhost:3001/user';


export const getUserInfo = async () => {
    try {
      const response = await axios.get(API_URL + '/profile', { 
        headers: authHeader()})
      if (response.data) {
        console.log('response', response)

        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
console.log('error', error)
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };