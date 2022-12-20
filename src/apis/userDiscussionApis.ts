import axiosDiscussions from './clients/axiosDiscussions';
import { ListResponse } from 'models';

export const userDiscussionApis = {
    getUsersDiscussion: (workspaceId: string, communityId: string): Promise<ListResponse> => {
        const url = `/${workspaceId}/api/users`;

        return axiosDiscussions.get(url, {
            params: {
                communityId: communityId,
            },
        });
    },
};
