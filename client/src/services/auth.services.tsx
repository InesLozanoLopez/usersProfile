import axios from 'axios';
import { toast } from 'react-toastify';
import { ILogin, IPasswordChange, IProfile } from '../interfaces';
import { authHeader } from './auth.header';

const API_URL = 'http://localhost:3001/authRouter';

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
      confirmPassword,
    });
    toast.success('Registration successful! Welcome!')
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
  }
};

export const loginUser = async ({ email, password }: ILogin) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    if (response.data) {
      localStorage.setItem(
        'accessToken',
        JSON.stringify(response.data.accessToken),
      );
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
  }
};

export const getCurrentUser = (): IProfile | null => {
  const UserStr = localStorage.getItem('user');
  if (UserStr) {
    return JSON.parse(UserStr);
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
};

export const changePassword = async ({
  values,
  userId,
}: {
  values: IPasswordChange;
  userId: number;
}) => {
  try {
    const data = { values, userId };
    const response = await axios.patch(`${API_URL}/profile`, data, {
      headers: authHeader(),
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
  }
};
