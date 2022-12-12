import { selectUser } from 'features/slices/sso/authSlice';
import React from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { useAuth } from 'utils';

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthContext = React.createContext({});

const AuthProvider = ({ children }: AuthProviderProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { token } = useParams();

    const isAuth = useAuth();
    const currentUser = useAppSelector(selectUser);

    React.useEffect(() => {
        if (!isAuth && !currentUser) {
            if (location.pathname !== '/reset-password' && !token) {
                navigate('/login', { replace: true });
            }
            return;
        }
    }, [isAuth]);

    const contextValue = React.useMemo(
        () => ({
            isLogged: !!isAuth,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
