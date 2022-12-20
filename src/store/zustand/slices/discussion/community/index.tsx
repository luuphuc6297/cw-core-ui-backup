import { communityApis } from 'apis/communityApis';
import { ListResponse } from 'models';
import { StateCreator } from 'zustand';

export interface CommunitySlice {
    loading: boolean;
    communities: ListResponse;
    community: any;
    getAllCommunities: (workspaceId: string) => void;
}
const initCommunities: ListResponse = {
    meta: {
        count: 0,
        totalPages: 0,
        limit: 0,
        skip: 0,
    },
    data: [],
};

const initCommunity: any = {};

export const createCommunitySlice: StateCreator<
    CommunitySlice,
    [['zustand/devtools', never], ['zustand/persist', never]],
    []
> = (set, get) => ({
    loading: false,
    communities: initCommunities,
    community: initCommunity,
    getAllCommunities: async (workspaceId: string) => {
        const result: ListResponse = await communityApis.getCommunities(workspaceId);

        set(() => ({ communities: result }));
    },
});
