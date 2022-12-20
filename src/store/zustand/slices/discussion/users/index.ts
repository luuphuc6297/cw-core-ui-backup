import { userDiscussionApis } from 'apis/userDiscussionApis';
import { ListResponse } from 'models';
import { StateCreator } from 'zustand';

export interface UsersDiscussionSlice {
    loading: boolean;
    usersDiscussion: ListResponse;
    getAllUsersDiscussion: (workspaceId: string, communityId: string) => void;
}

const initUsersDiscussion: ListResponse = {
    meta: {
        count: 0,
        totalPages: 0,
        limit: 0,
        skip: 0,
    },
    data: [],
};

export const createUsersDiscussionSlice: StateCreator<
    UsersDiscussionSlice,
    [['zustand/devtools', never], ['zustand/persist', never]],
    []
> = (set, get) => ({
    loading: false,
    usersDiscussion: initUsersDiscussion,
    getAllUsersDiscussion: async (workspaceId: string, communityId: string) => {
        const result: ListResponse = await userDiscussionApis.getUsersDiscussion(workspaceId, communityId);

        set(() => ({ usersDiscussion: result }));
    },
});
