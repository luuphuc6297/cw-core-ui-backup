import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthenProvider } from 'providers';

interface AuthLayoutProps {
    children?: React.ReactElement;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <>
            <AuthenProvider>
                {children}
                <Outlet />
            </AuthenProvider>
        </>
    );
};

export default AuthLayout;
