import { ListResponse } from 'models';
import axiosDiscussions from './clients/axiosDiscussions';

export const communityApis = {
    getCommunities: (workspaceId: string): Promise<ListResponse> => {
        const url = `${workspaceId}/api/communities`;
        return axiosDiscussions.get(url);
    },
};
