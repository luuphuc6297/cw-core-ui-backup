import { get } from 'lodash';

export const getToken = () => {
    const token = window.localStorage.getItem('access_token');
    return token || null;
};

export const setToken = (value: string) => {
    window.localStorage.setItem('access_token', value);
};

export const getAuth = () => {
    const json = window.localStorage.getItem('persist:root');

    if (!json) return false;

    const convertJson = JSON.parse(json);

    const auth = JSON.parse(convertJson.auth);
    return get(auth, 'isLoggedIn', false);
};

export const getTokenAuth = () => {
    const json = window.localStorage.getItem('persist:root');

    if (!json) return false;

    const convertJson = JSON.parse(json);

    const auth = JSON.parse(convertJson.auth);

    return get(auth, 'currentUser.token', null);
};

export const useAuth = () => {
    return Boolean(localStorage.getItem('access_token'));
};
