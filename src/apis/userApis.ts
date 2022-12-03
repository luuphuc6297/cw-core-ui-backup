import { CurrentUser, ListResponse, UpdateProfile, ResponseLoginUser, User } from '@cw-ui-core/commons';
import axiosSSO from './axiosSSO';
import axiosRTC from './axiosRTC';

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
