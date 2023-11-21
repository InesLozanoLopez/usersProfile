import React from 'react';
import './App.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IProfile } from './interfaces';

const App = () => {
  const noAllowedSymbols = /^[(){}]+$/;
  const patternLetters = /^[A-Za-z]+$/;
  const patternLettersAndNumbers = /^[A-Za-z0-9]+$/;

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      avatar: null,
    },
    validationSchema: Yup.object({
      userName: Yup.string().required('Please add your user name'),
      email: Yup.string().required('Please add your email address'),
      password: Yup.string().required('Please add a password'),
      avatar: Yup.mixed().test('fileSize', 'The image should be smaller than 100mb', (value) => {
        if (value) {
          return (value as File).size <= 100000000;
        }
        return true;
      })
    }),
    onSubmit: async (values: IProfile) => {
      console.log('onSubmit triggered'); // Add this line
      console.log('values', values);
      if (!patternLetters.test(values.userName)) {
        toast.warning('Name not allowed, just letters allowed')
      }
      else if (noAllowedSymbols.test(values.email)) {
        toast.warning('Email format not allowed')
      }
      else if (!patternLettersAndNumbers.test(values.password)) {
        toast.warning('Only numbers and letters allowed in the password')
      } else {
        toast.info('created')
      }
    }
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <input type='text' aria-label='Insert your name' placeholder='Name...' id='userName' value={formik.values.userName} onChange={formik.handleChange} />
        <input type='text' aria-label='Insert your email' placeholder='Email...' id='email' value={formik.values.email} onChange={formik.handleChange} />
        <input type='text' aria-label='Insert your password' placeholder='Password...' id='password' value={formik.values.password} onChange={formik.handleChange} />
        <input type='file' aria-label='Upload your avatar image' id='avatar' accept='image/*' onChange={(event) => formik.setFieldValue('avatar', event.currentTarget.files ? event.currentTarget.files[0] : null)} />
        {formik.values.avatar && (
          <div>
            <p>selected image</p>
            <img src={URL.createObjectURL(formik.values.avatar)} alt="Selected imagen"/>
          </div>
        )}
        <button type="submit">Create Profile</button>
      </form>
    </>
  );
}

export default App;
