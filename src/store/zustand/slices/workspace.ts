import { ListResponse, WorkSpace } from 'models';
import { StateCreator } from 'zustand';

export interface WorkSpaceSlice {
    workspaces: WorkSpace[];
    workspace: WorkSpace;
    users: ListResponse;
}

const initUsers: ListResponse = {
    meta: {
        count: 0,
        totalPages: 0,
        limit: 0,
        skip: 0,
    },
    data: [],
};

const initWorkSpace = {
    id: '',
    attributes: {
        name: '',
        ownerId: '',
        subdomain: '',
        domain: '',
        dropletName: '',
        description: '',
        accentColor: '',
        bannerUrl: '',
        logoUrl: '',
    },
};

export const createWorkSpaceSlice: StateCreator<WorkSpaceSlice, [], [], WorkSpaceSlice> = (set) => ({
    workspace: initWorkSpace,
    workspaces: [],
    users: initUsers,
    storeWorkSpaces: (data: WorkSpace[]) => {
        set({ workspaces: data });
    },
    storeWorkSpace: (data: WorkSpace) => {
        set({ workspace: data });
    },
    setUsers: async (result: ListResponse) => {
        set({ users: result });
    },
    // getWorkSpaceDetail: async (workSpaceId: string) => {
    //     const result: WorkSpace = await workSpaceApis.getWorkSpaceDetail(workSpaceId);
    //     set({ workspace: result });
    //     return result;
    // },
});
