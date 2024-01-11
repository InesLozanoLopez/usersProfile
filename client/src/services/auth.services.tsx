import axios from 'axios';
import { toast } from 'react-toastify';
import { ILogin, IProfile } from '../interfaces';
import { authHeader } from './auth.header.tsx';

const API_URL = 'http://localhost:3001';

export const registerUser = async ({
    name,
    email,
    password,
    confirmPassword,
}: IProfile) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            name,
            email,
            password,
            confirmPassword
        });
        console.log('registerServiceOut');
        return response;
    } catch (error) {
        console.log('registerServiceError');

        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message)
        }
    }
}

export const loginUser = async ({
    email,
    password,
}: ILogin) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
        });
        if (response.data) {
            localStorage.setItem(
                'accessToken',
                JSON.stringify(response.data.accessToken),
            )
        }
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message)
        }
    }
}

export const getCurrentUser = (): IProfile | null => {
   const UserStr =  localStorage.getItem('user');
   if(UserStr){
    return JSON.parse(UserStr);
   }
   return null
};

export const getUser = async () => {
  try {
    const response = await axios.get(API_URL + '/user', {
      headers: authHeader(),
    });
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