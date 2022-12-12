import { authApis } from 'apis/authApis';
import { authActions } from 'features/slices/sso/authSlice';
import { first } from 'lodash';
import { Login, ResponseUser, WorkSpaces, CurrentUser, WorkSpace } from 'models';
import { LoginPage } from 'pages';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'store/hooks';
import { useRtcStore } from 'store/zustand/rtcStore';
import { UserSlice, WorkSpaceSlice } from 'store/zustand/slices';
import { USER_STATUS } from 'utils';

const LoginContainer = () => {
    const dispatch = useAppDispatch();

    const initialValues: Login = {
        email: '',
        password: '',
    } as Login;

    const { storeWorkSpaces, storeWorkSpace } = useRtcStore((state: WorkSpaceSlice) => state);
    const { storeUser } = useRtcStore((state: UserSlice | any) => state);

    const handleLogin = async (formValues: Login) => {
        try {
            const { email, password } = formValues;
            const response: ResponseUser = await authApis.login({ email, password });

            const { 
                token,
                payload: { id, workspaces, ...infoUser },
            } = response;

            if (token) {
                localStorage.setItem('access_token', response.token);

                const user: CurrentUser = { id, attributes: { _id: id, ...infoUser } };
                user.attributes.token = token;
                storeUser(user);

                if (workspaces && workspaces.length > 0) {
                    const mappingWorkSpace = workspaces.map((item: WorkSpaces) => {
                        return { id: item.id, attributes: item } as WorkSpace;
                    });

                    storeWorkSpace(first(mappingWorkSpace)!);

                    storeWorkSpaces(mappingWorkSpace);
                }
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
function storeWorkSpace(arg0: { id: string; attributes: any; } | undefined) {
    throw new Error('Function not implemented.');
}

function storeUser(user: CurrentUser) {
    throw new Error('Function not implemented.');
}

