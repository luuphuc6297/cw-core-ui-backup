import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from 'utils';

const axiosSSO = axios.create({
    baseURL: 'https://dev-sso-api.coachingworkspace.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axiosSSO.interceptors.request.use(
    function (config: AxiosRequestConfig) {
        // Do something before request is sent
        const token = getToken();
        if (token) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            config!.headers!['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosSSO.interceptors.response.use(
    function (response: AxiosResponse) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export default axiosSSO;
