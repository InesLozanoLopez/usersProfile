import { default as axios } from 'axios';
import { toast } from "react-toastify";
import { authHeader } from "./auth.header";
import { IUserInfo } from "../interfaces";

const API_URL = 'http://localhost:3001/user';


export const getUserInfo = async () => {
  try {
    const response = await axios.get(API_URL + '/profile', {
      headers: authHeader(),
    })
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
  }
};

export const updateUserInfo = async ({ values, userId }: { values: IUserInfo, userId: number }) => {
  try {
    const userInfo = {values, userId};
    const response = await axios.patch(API_URL + '/profile', userInfo, {
      headers: {
      ...authHeader(),
    }})
    
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
  }
}