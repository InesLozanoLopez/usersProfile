import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Registration from './components/auth/registration'

const AppRouter: React.FC = () => {

    return(
        <>
        <Routes>
            <Route path="/registration" element={<Registration/>} />
        </Routes>
        </>
    )
}

export default AppRouter;