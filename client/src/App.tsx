import React from 'react';
import './App.css';
import AppRouter from './router.tsx';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <>
      <AppRouter/>
      <ToastContainer position="top-right" theme="colored"/>
    </>
  );
}

export default App;
