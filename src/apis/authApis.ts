import {
    CurrentUser, Login, Register,
    ResponseUser,
    ResponseVerifiedEmail,
    SetupPassword,
    UpdateProfile,
    UploadAvatar, VerifyEmail
} from 'models';
import axiosSSO from './clients/axiosSSO';

export const authApis = {
    login(data: Login): Promise<ResponseUser> {
        const url = '/auth/login';
        return axiosSSO.post(url, data);
    },
    sendEmail(data: Register): Promise<Register> {
        const url = '/verifications/request-verify-email';
        return axiosSSO.post(url, data);
    },
    verifyEmail(data: VerifyEmail): Promise<ResponseVerifiedEmail> {
        const url = '/verifications/verify-email';
        return axiosSSO.post(url, data);
    },
    setupPassword(data: SetupPassword): Promise<SetupPassword> {
        const url = '/users/me/set-password';
        return axiosSSO.patch(url, data);
    },
    updateProfile(data: UpdateProfile): Promise<CurrentUser> {
        const url = '/users/me';
        return axiosSSO.patch(url, data);
    },
    uploadAvatar(data: UploadAvatar, onUploadProgress: any): Promise<UploadAvatar> {
        const url = '/users/me/upload-avatar';
        return axiosSSO.patch(url, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress,
        });
    },
    deleteAvatar(): Promise<any> {
        const url = '/users/me/remove-avatar';
        return axiosSSO.patch(url);
    },
};
