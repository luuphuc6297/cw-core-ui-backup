import { authApis } from 'apis/authApis';
import { authActions } from 'features/slices/sso/authSlice';
import { Login, ResponseUser } from 'models';
import { LoginPage } from 'pages';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'store/hooks';
import { USER_STATUS } from 'utils';

const LoginContainer = () => {
    const dispatch = useAppDispatch();

    const initialValues: Login = {
        email: '',
        password: '',
    } as Login;

    const handleLogin = async (formValues: Login) => {
        try {
            const { email, password } = formValues;
            const response: ResponseUser = await authApis.login({ email, password });

            const { token } = response;

            if (token) {
                dispatch(authActions.loginSuccess(response));
                switch (response?.payload.status) {
                    case USER_STATUS.ACTIVE: {
                        toast.success('Login successful');
                        redirect('/');
                        break;
                    }
                    case USER_STATUS.NEWBIE:
                        redirect('/update-profile');
                        break;
                }
            }
        } catch (error: any) {
            if (error?.response?.status === 401) {
                dispatch(authActions.loginFailed('Email or password is incorrect'));
            } else {
                toast.error(error.message);
            }
        }
    };

    return <LoginPage initialValues={initialValues} onSubmit={handleLogin} />;
};

export default LoginContainer;
