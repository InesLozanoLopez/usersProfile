import React from 'react';
import './App.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IProfile } from '../../interfaces';
import { registerUser } from '../../services/auth.services';

const Registration: React.FC = () => {
  const noAllowedSymbols = /^[(){}]+$/;
  const patternLetters = /^[A-Za-z]+$/;
  const patternLettersAndNumbers = /^[A-Za-z0-9]+$/;

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Please add your user name'),
      email: Yup.string().required('Please add your email address'),
      password: Yup.string().required('Please add a password'),
      confirmPassword: Yup.string().required('Please add a password'),
    }),
    onSubmit: async (values: IProfile) => {
      console.log('onSubmit triggered'); // Add this line
      console.log('values', values);
      if (!patternLetters.test(values.name)) {
        toast.warning('Name not allowed, just letters allowed')
      }
      else if (noAllowedSymbols.test(values.email)) {
        toast.warning('Email format not allowed')
      }
      else if (!patternLettersAndNumbers.test(values.password)) {
        toast.warning('Only numbers and letters allowed in the password')
      } else if (!patternLettersAndNumbers.test(values.confirmPassword)){
          toast.warning('Only numbers and letters allowed in the confirm password')
      } else {
        registerUser(formik.values)
      }
    }
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <input type='text' aria-label='Insert your name' placeholder='Name...' id='name' value={formik.values.name} onChange={formik.handleChange} />
        <input type='text' aria-label='Insert your email' placeholder='Email...' id='email' value={formik.values.email} onChange={formik.handleChange} />
        <input type='text' aria-label='Insert your password' placeholder='Password...' id='password' value={formik.values.password} onChange={formik.handleChange} />
        <input type='text' aria-label='Confirm your password' placeholder='Confirm password...' id='confirmPassword' value={formik.values.confirmPassword} onChange={formik.handleChange} />

        <button type="submit">Create Profile</button>
      </form>
    </>
  );
}

export default Registration;
