import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Registration from './components/auth/registration';
import Login from './components/auth/login';
import Profile from './components/profile';
import { AuthGuard } from './services/auth.guard';
import Main from './components/main';

const AppRouter: React.FC = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route element={<AuthGuard />}>
                    <Route path="/main" element={<Main />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </>
    )
}

export default AppRouter;