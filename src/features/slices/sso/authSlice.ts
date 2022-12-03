import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseUser } from 'models';
import { RootState } from 'store/store';

export interface AuthState {
    isLoggedIn: boolean;
    logging?: boolean;
    currentUser?: ResponseUser;
    error?: string;
}

const initialState: AuthState = {
    isLoggedIn: false,
    logging: false,
    currentUser: undefined,
    error: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<any>) {
            state.logging = true;
        },
        loginSuccess(state, action: PayloadAction<ResponseUser>) {
            state.isLoggedIn = true;
            state.logging = false;
            state.currentUser = action.payload;
        },
        loginFailed(state, action: PayloadAction<string>) {
            state.logging = false;
            state.error = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.currentUser = undefined;
        },
        clearError(state) {
            state.error = '';
        },
    },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLogging = (state: RootState) => state.auth.logging;
export const selectUser = (state: RootState) => state.auth.currentUser;
export const selectError = (state: RootState) => state.auth.error;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
