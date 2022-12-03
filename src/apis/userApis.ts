import axiosRTC from 'apis/clients/axiosRTC';
import axiosSSO from 'apis/clients/axiosSSO';
import { CurrentUser, ListResponse, ResponseLoginUser, UpdateProfile, User } from 'models';

export const userApis = {
    login(data: User): Promise<ResponseLoginUser> {
        const url = '/auth/login';
        return axiosSSO.post(url, data);
    },
    updateProfile(data: UpdateProfile): Promise<CurrentUser> {
        const url = '/users/me';
        return axiosSSO.patch(url, data);
    },
    getListUser: (workspaceId: string): Promise<ListResponse> => {
        const url = `/${workspaceId}/api/users`;
        return axiosRTC.get(url);
    },
};
