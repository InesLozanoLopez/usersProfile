import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Registration from './components/auth/registration.tsx';
import Login from './components/auth/login.tsx';

const AppRouter: React.FC = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    )
}

export default AppRouter;