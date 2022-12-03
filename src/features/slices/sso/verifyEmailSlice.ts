import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseVerifiedEmail } from 'models';
import { RootState } from 'store/store';

export interface VerifyCodePayload {
    email: any;
    code: string;
}
export interface RequestVerifyEmailState {
    logging?: boolean;
    currentUser?: ResponseVerifiedEmail;
}

const initialState: RequestVerifyEmailState = {
    logging: false,
    currentUser: undefined,
};

const verifyEmailSlice = createSlice({
    name: 'verifyEmail',
    initialState,
    reducers: {
        storeEmail(state, action: PayloadAction<any>) {
            state.currentUser = action.payload;
        },
        confirmCode(state, action: PayloadAction<VerifyCodePayload>) {
            state.logging = true;
        },
        confirmCodeSuccess(state, action: PayloadAction<ResponseVerifiedEmail>) {
            state.logging = false;
            state.currentUser = action.payload;
        },
        confirmCodeFailed(state, action: PayloadAction<string>) {
            state.logging = false;
        },
        clearCurrentUser(state) {
            state.logging = false;
            state.currentUser = undefined;
        },
    },
});

export const verifyEmailActions = verifyEmailSlice.actions;

export const selectCurrentUser = (state: RootState) => state?.verifyEmail?.currentUser;

const requestVerifyEmailReducer = verifyEmailSlice.reducer;

export default requestVerifyEmailReducer;
