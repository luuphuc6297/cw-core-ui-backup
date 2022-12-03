import { CurrentUser, Login, ResponseUser, WorkSpace } from 'models';
import { authApis } from 'apis/authApis';
import { authActions } from 'features/slices/sso/authSlice';
import { first } from 'lodash';
import { LoginPage } from 'pages';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'store/hooks';
import { CLIENT_EVENT, timeout, USER_STATUS } from 'utils';

const LoginContainer = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const initialValues: Login = {
        email: '',
        password: '',
    } as Login;

    const sendEvent = async (data: any) => {
        await timeout(4000);
        const widgetEvent = new CustomEvent(CLIENT_EVENT.SYNC_DATA, {
            detail: data,
        });

        window.dispatchEvent(widgetEvent);
    };

    const handleLogin = async (formValues: Login) => {
        try {
            const { email, password } = formValues;
            const response: ResponseUser = await authApis.login({ email, password });

            const {
                token,
                payload: { id, workspaces, ...infoUser },
            } = response;

            if (token) {
                const mappingWorkSpace: WorkSpace[] = [];
                localStorage.setItem('access_token', response.token);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                const user: CurrentUser = { id, attributes: { ...infoUser } };
                user.attributes.token = token;
                // storeUser(user);
                localStorage.setItem('user', JSON.stringify(user));

                if (workspaces && workspaces.length > 0) {
                    mappingWorkSpace.push(...(workspaces as any));
                    // storeWorkSpace(first(mappingWorkSpace));
                    // storeWorkSpaces(mappingWorkSpace);
                }
                const dataSync = {
                    user,
                    workspace: first(mappingWorkSpace),
                    workspaces: mappingWorkSpace,
                };

                dispatch(authActions.loginSuccess(response));

                switch (response?.payload.status) {
                    case USER_STATUS.ACTIVE: {
                        toast.success('Login successful');
                        navigate('/rtc');
                        break;
                    }
                    case USER_STATUS.NEWBIE:
                        navigate('/sso/update-profile');
                        break;
                }
                await sendEvent(dataSync);
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
