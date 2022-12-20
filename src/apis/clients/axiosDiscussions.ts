import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from 'utils';

const axiosDiscussions = axios.create({
    baseURL: 'https://dev-discussion-api.coachingworkspace.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axiosDiscussions.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        // Do something before request is sent
        const token = getToken();
        if (token) {
            config!.headers!.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosDiscussions.interceptors.response.use(
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

export default axiosDiscussions;
