import React from 'react';
// import './../App.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ILogin } from '../../interfaces';
import { loginUser } from '../../services/auth.services.tsx';

const Login: React.FC = () => {
  const noAllowedSymbols = /^[(){}]+$/;
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
     if (noAllowedSymbols.test(values.email)) {
        toast.warning('Email format not allowed')
      }
      else if (!patternLettersAndNumbers.test(values.password)) {
        toast.warning('Only numbers and letters allowed in the password')
      } else {
        loginUser(formik.values)
      }
    }
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <input type='text' aria-label='Insert your email' placeholder='Email...' id='email' value={formik.values.email} onChange={formik.handleChange} />
        <input type='text' aria-label='password' placeholder='Password...' id='password' value={formik.values.password} onChange={formik.handleChange} />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
