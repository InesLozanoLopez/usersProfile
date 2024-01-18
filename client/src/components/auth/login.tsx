import React from 'react';
// import './../App.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ILogin } from '../../interfaces';
import { loginUser } from '../../services/auth.services';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUserInfo } from '../../services/userProfile.services';
import './../../styles/Login.css';


const Login: React.FC = () => {
    const navigate = useNavigate();

    const noAllowedSymbols = /^[(){}*]+$/;
    const patternLettersAndNumbers = /^[A-Za-z0-9]+$/;

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Please insert your address'),
            password: Yup.string().required('Please insert your password'),
        }),
        onSubmit: async (values: ILogin) => {
            try {
                if (noAllowedSymbols.test(values.email)) {
                    toast.warning('Email format not allowed')
                }
                else if (!patternLettersAndNumbers.test(values.password)) {
                    toast.warning('Only numbers and letters allowed in the password')
                } else {
                    const response = await loginUser(formik.values);

                    if (response) {
                        try {
                            const user = await getUserInfo();
                            navigate('/profile', { state: { user } });
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data.message)
                }
            }
        }
    })

    const handleRegistration = () => {
        navigate('/registration');
    }

    return (
        <>
            <section id='formContainer'>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        type='text'
                        aria-label='Insert your email'
                        placeholder='Email...'
                        id='email'
                        className='formInput'
                        value={formik.values.email}
                        onChange={formik.handleChange} />
                    <input
                        type='text'
                        aria-label='password'
                        placeholder='Password...'
                        id='password'
                        className='formInput'
                        value={formik.values.password}
                        onChange={formik.handleChange} />
                    <button
                        type="submit"
                        aria-label='submit'
                        className="button"
                    >Login</button>
                </form>
            </section>

            <section id='registration'>
                <button
                    type="button"
                    aria-label='submit'
                    className="button"
                    onClick={handleRegistration}
                >Registration</button>
            </section>
        </>

    );
}

export default Login;
