import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseSetupPassword } from 'models';

export interface SetupPasswordPayload {
    password: string;
    navigate?: any;
    // confirmPwd: string;
}
export interface SetupPasswordState {
    logging?: boolean;
    attributes?: ResponseSetupPassword;
}

const initialState: SetupPasswordState = {
    logging: false,
    attributes: undefined,
};

const setupPasswordSlice = createSlice({
    name: 'setupPassword',
    initialState,
    reducers: {
        confirmPassword(state, action: PayloadAction<SetupPasswordPayload>) {
            state.logging = true;
        },
        confirmPasswordSuccess(state, action: PayloadAction<ResponseSetupPassword>) {
            state.logging = false;
            state.attributes = action.payload;
        },
        confirmPasswordFailed(state, action: PayloadAction<string>) {
            state.logging = false;
        },
    },
});

export const setupPasswordActions = setupPasswordSlice.actions;

const setupPasswordReducer = setupPasswordSlice.reducer;

export default setupPasswordReducer;
