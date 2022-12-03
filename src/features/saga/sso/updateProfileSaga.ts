import { Action, PayloadAction } from '@reduxjs/toolkit';
import { ResponseUpdateProfile, UploadAvatar } from 'models';
import { toast } from 'react-toastify';
import { buffers, END, eventChannel } from 'redux-saga';
import { ActionPattern, call, put, take, takeLatest } from 'redux-saga/effects';
import { authApis } from 'apis/authApis';
import { updateProfileActions } from 'features/slices/sso/updateProfileSlice';

interface EmitterProps {
    percent?: number;
    success?: boolean;
    error?: any;
    data?: UploadAvatar;
}

function* updateProfile({ payload }: PayloadAction<any>): any {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const response: ResponseUpdateProfile = yield authApis.updateProfile({
            firstName: payload?.formValues?.firstName,
            lastName: payload?.formValues?.lastName,
            phone: payload?.formValues?.phone,
            timezone: payload?.formValues?.timezone,
            avatarUrl: payload?.formValues?.avatarUrl,
            password: payload?.formValues?.password,
            bio: payload?.formValues?.bio,
        });
        if (response?.attributes) {
            yield put(updateProfileActions.updateProfileSuccess(response));
            payload?.navigate('/');
            toast.success(`Update profile successful`);
        }
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* uploadAvatar({ payload }: PayloadAction<any>) {
    try {
        const createUploadFileChannel = () => {
            return eventChannel<EmitterProps>((emitter) => {
                const onUploadProgress = (event: ProgressEvent) => {
                    if (event.lengthComputable) {
                        const percent: number = Math.floor((event.loaded / event.total) * 100);
                        emitter({ percent: percent });
                    }
                };
                const onFailure = (error: any) => {
                    emitter({ error: error });
                    emitter(END);
                };
                authApis
                    .uploadAvatar(payload, onUploadProgress)
                    .then((result) => {
                        if (result?.attributes) {
                            emitter({ success: true, data: result });
                            emitter(END);
                        }
                    })
                    .catch((error: any) => {
                        onFailure(error);
                    });
                return () => {
                    console.log('some thing');
                };
            }, buffers.sliding(2));
        };

        const channel: ActionPattern<Action<any>> = yield call(createUploadFileChannel);

        while (true) {
            const { percent = 0, success, data, error } = yield take(channel);

            yield put(updateProfileActions.uploadAvatarProgress(percent));

            if (error) {
                toast.error(error);
                return;
            }
            if (success) {
                yield put(updateProfileActions.uploadAvatarSuccess(data));
                toast.success(`Upload avatar successful`);
                return;
            }
        }
    } catch (error: any) {
        toast.error(error.message);
    }
}

function* deleteAvatar() {
    try {
        const response: ResponseUpdateProfile = yield authApis.deleteAvatar();
        if (response?.attributes) {
            yield put(updateProfileActions.updateProfileSuccess(response));
            toast.success(`Delete avatar successful`);
        }
    } catch (error: any) {
        toast.error(error.message);
    }
}

export default function* updateProfileSaga() {
    yield takeLatest(updateProfileActions.uploadAvatar, uploadAvatar);
    yield takeLatest(updateProfileActions.deleteAvatar, deleteAvatar);
    yield takeLatest(updateProfileActions.updateProfile, updateProfile);
}
