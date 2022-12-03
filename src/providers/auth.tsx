import { useAuthentication } from 'hooks';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getTokenAuth } from 'utils';

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthContext = React.createContext<any>({});

const AuthProvider = ({ children }: AuthProviderProps) => {
    const token = getTokenAuth();
    const navigate = useNavigate();

    const { isAuth } = useAuthentication();

    React.useEffect(() => {
        // eslint-disable-next-line no-constant-condition
        if (!isAuth) {
            navigate('/login', { replace: true });
        } else {
            navigate('/home', { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth]);

    const contextValue = React.useMemo(
        () => ({
            isLogged: !!token,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
