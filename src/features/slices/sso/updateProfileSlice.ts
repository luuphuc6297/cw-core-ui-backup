import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UploadAvatar } from 'models';
import { RootState } from 'store/store';

export interface UpdateProfileState {
    loading?: boolean;
    currentUser?: UploadAvatar;
    percent?: number;
}

interface DeleteAvatarState {
    avatarUrl: string;
}
const initialState: UpdateProfileState = {
    loading: false,
    currentUser: undefined,
    percent: 1,
};

const updateProfileSlice = createSlice({
    name: 'updateProfile',
    initialState,
    reducers: {
        updateProfile(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        updateProfileSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.currentUser = action.payload;
        },
        updateProfileFailed(state, action: PayloadAction<string>) {
            state.loading = false;
        },
        uploadAvatar(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        uploadAvatarSuccess(state, action: PayloadAction<any>) {
            state.currentUser = action.payload;
            state.loading = false;
        },
        uploadAvatarFailed(state, action: PayloadAction<DeleteAvatarState>) {
            state.loading = false;
        },
        uploadAvatarProgress(state, action: PayloadAction<number>) {
            state.percent = action.payload;
        },
        deleteAvatar(state) {
            state.loading = false;
        },
    },
});

export const updateProfileActions = updateProfileSlice.actions;

export const selectUser = (state: RootState) => state.updateProfile?.currentUser;
export const selectAttributes = (state: RootState) => state.updateProfile?.currentUser?.attributes;
export const selectPercent = (state: RootState) => state.updateProfile?.percent;

const updateProfileReducer = updateProfileSlice.reducer;

export default updateProfileReducer;
