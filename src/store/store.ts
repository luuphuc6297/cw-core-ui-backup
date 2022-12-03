import { Action, combineReducers, compose, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from 'features/slices/sso/authSlice';
import setupPasswordReducer from 'features/slices/sso/setupPasswordSlice';
import updateProfileReducer from 'features/slices/sso/updateProfileSlice';
import verifyEmailReducer from 'features/slices/sso/verifyEmailSlice';
import { createBrowserHistory } from 'history';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth', 'forgotPassword'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    verifyEmail: verifyEmailReducer,
    setupPassword: setupPasswordReducer,
    updateProfile: updateProfileReducer,
});

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware: (arg0: { serializableCheck: boolean }) => any[]) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(sagaMiddleware),
});

export const history = createBrowserHistory();

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
