import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import {getCurrentUser} from './auth.services.tsx';

export const AuthGuard: React.FC = () => {
    const authUser = getCurrentUser();
    return authUser ? <Outlet /> : <Navigate to={'/login'} replace/>
}