import { CurrentUser, UpdateProfile } from 'models';
import { StateCreator } from 'zustand';
import { userApis } from 'apis/userApis';

export interface UserSlice {
    user: CurrentUser;
    storeUser: (user: CurrentUser) => void;
}

const initUser: CurrentUser = {
    id: '',
    attributes: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        id: '',
        iss: '',
        sub: '',
        type: '',
        status: '',
        timezone: {
            value: '',
            offset: 0,
            abbrev: '',
        },
        createdAt: '',
        updatedAt: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        avatarUrl: '',
        setPassword: false,
        bio: '',
        workspaces: [],
        token: '',
    },
};

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (set) => ({
    user: initUser,
    storeUser: (user: CurrentUser) => set(() => ({ user: user })),
    updateProfileUser: async (data: UpdateProfile) => {
        const result: CurrentUser = await userApis.updateProfile(data);
        set(() => ({ user: result }));
        return result;
    },
    clearUser: () => set(() => ({ user: initUser })),
});
