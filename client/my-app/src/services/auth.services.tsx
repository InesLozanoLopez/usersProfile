import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:3000';

interface registerRequest {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export const registerUser = async ({
    name,
    email,
    password,
    confirmPassword,
}: registerRequest) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            name,
            email,
            password,
            confirmPassword
        });
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message)
        }
    }
}