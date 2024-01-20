import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IProfile } from '../../interfaces';
import { registerUser } from '../../services/auth.services';
import { useNavigate } from 'react-router-dom';
import './../../styles/Registration.css';

const Registration: React.FC = () => {
  const navigate = useNavigate();

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
      if (!patternLetters.test(values.name)) {
        toast.warning('Name not allowed, just letters allowed');
      } else if (noAllowedSymbols.test(values.email)) {
        toast.warning('Email format not allowed');
      } else if (!patternLettersAndNumbers.test(values.password)) {
        toast.warning('Only numbers and letters allowed in the password');
      } else if (!patternLettersAndNumbers.test(values.confirmPassword)) {
        toast.warning(
          'Only numbers and letters allowed in the confirm password',
        );
      } else {
        registerUser(formik.values);
        navigate('/profile');
      }
    },
  });

  return (
    <section id="formContainerLogin">
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          aria-label="Insert your name"
          placeholder="Name..."
          id="name"
          className="formInput"
          value={formik.values.name}
          onChange={formik.handleChange}
          autoComplete="user-name"
        />
        <input
          type="text"
          aria-label="Insert your email"
          placeholder="Email..."
          id="email"
          className="formInput"
          value={formik.values.email}
          onChange={formik.handleChange}
          autoComplete="user-email"
        />
        <input
          type="password"
          aria-label="Insert your password"
          placeholder="Password..."
          id="password"
          className="formInput"
          value={formik.values.password}
          onChange={formik.handleChange}
          autoComplete="user-password"
        />
        <input
          type="password"
          aria-label="Confirm your password"
          placeholder="Confirm password..."
          id="confirmPassword"
          className="formInput"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          autoComplete="user-password"
        />

        <div className="submit">
          <button
            type="submit"
            aria-label="Submit to create a new profile"
            className="button"
          >
            Create Profile
          </button>
        </div>
      </form>
    </section>
  );
};

export default Registration;
