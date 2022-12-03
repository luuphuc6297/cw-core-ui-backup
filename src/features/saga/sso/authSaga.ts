import { PayloadAction } from '@reduxjs/toolkit';
import { authApis } from 'apis/authApis';
import { ResponseUser } from 'models';
import { toast } from 'react-toastify';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { USER_STATUS } from 'utils';
import { authActions } from 'features/slices/sso/authSlice';

function* handleLogin({ payload }: PayloadAction<any>) {
    try {
        const response: ResponseUser = yield authApis.login({
            email: payload?.formValues?.email,
            password: payload?.formValues?.password,
        });
        if (response?.token) {
            localStorage.setItem('access_token', response.token);
            yield put(authActions.loginSuccess(response));
            switch (response?.payload.status) {
                case USER_STATUS.ACTIVE:
                    payload?.navigate('/home');
                    toast.success('Login successful');
                    break;
                case USER_STATUS.NEWBIE:
                    payload?.navigate('/home');
                    break;
            }
        }
    } catch (error: any) {
        if (error?.response?.status === 401) {
            yield put(authActions.loginFailed('Email or password is incorrect'));
        } else {
            toast.error(error.message);
        }
    }
}

function* handleLogout() {
    yield delay(500);
    localStorage.removeItem('access_token');
    // yield put(push('/login'));
}

export default function* authSaga() {
    yield takeLatest(authActions.login, handleLogin);
    yield call(handleLogout);
}
