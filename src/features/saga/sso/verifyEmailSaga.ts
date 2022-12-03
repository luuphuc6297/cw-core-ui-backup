import { PayloadAction } from '@reduxjs/toolkit';
import { authApis } from 'apis/authApis';
import { verifyEmailActions } from 'features/slices/sso/verifyEmailSlice';
import { ResponseVerifiedEmail } from 'models';
import { toast } from 'react-toastify';
import { put, takeLatest } from 'redux-saga/effects';

function* verifyEmail({ payload }: PayloadAction<any>) {
    try {
        const response: ResponseVerifiedEmail = yield authApis.verifyEmail({
            email: payload?.email,
            code: payload?.code,
        });
        if (response?.attributes?.data?.token) {
            yield put(verifyEmailActions.confirmCodeSuccess(response));

            window.localStorage.setItem('access_token', response?.attributes?.data?.token);
            payload?.navigate('/sso/setup-password');
            toast.success(`Verify email success`);
        } else {
            yield put(verifyEmailActions.confirmCodeFailed(response?.attributes?.message ?? ''));
            toast.error(`${response?.attributes?.message}`);
        }
    } catch (error: any) {
        toast.error(error.message);
        yield put(verifyEmailActions.confirmCodeFailed(error?.message));
    }
}
export default function* verifyEmailSaga() {
    yield takeLatest(verifyEmailActions.confirmCode, verifyEmail);
}
