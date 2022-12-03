/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getToken } from '@cw-ui-core/commons';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosRTC from './axiosRTC';
import axiosSSO from './axiosSSO';

const axiosFileClient = axios.create({
    baseURL: 'https://files.coachingworkspace.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axiosFileClient.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        // Do something before request is sent

        const token = getToken();
        if (token) {
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
axiosFileClient.interceptors.response.use(
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

export default axiosFileClient;

export const fileApis = {
    uploadFiles: (formsData: Array<any>): Promise<any> => {
        const apiData = formsData.map((item: any) => axiosFileClient.post('/assets', item).then((res) => res.data));
        return Promise.all(apiData);
    },
    uploadFile: (formData: any): Promise<any> => {
        const url = `/api/assets`;
        return axiosFileClient.post(url, formData);
    },
    generatePresignedUrl: (workspaceId: string, conversationId: string, fileName: string): Promise<any> => {
        const url = `/${workspaceId}/api/conversations/${conversationId}/presigned-url`;
        return axiosRTC.post(url, { fileName });
    },
    generatePresignedUrlSSO: (fileName: string): Promise<any> => {
        const url = `/api/users/me/presigned-url`;
        return axiosSSO.post(url, { fileName });
    }
};
