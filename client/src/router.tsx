import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Registration from './components/auth/registration.tsx';
import Login from './components/auth/login.tsx';
import { AuthGuard } from './services/auth.guard.tsx';
import Main from './components/main.tsx';

const AppRouter: React.FC = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route element={<AuthGuard/>}>
                    <Route path="/main" element={<Main />}/>
                </Route>
            </Routes>
        </>
    )
}

export default AppRouter;