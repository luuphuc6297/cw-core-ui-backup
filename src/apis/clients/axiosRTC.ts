import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getTokenAuth } from 'utils';

const axiosRTC = axios.create({
    baseURL: 'https://dev-rtc-api.coachingworkspace.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axiosRTC.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        // Do something before request is sent
        const token = getTokenAuth();
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
axiosRTC.interceptors.response.use(
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

export default axiosRTC;
