import axios, { AxiosInstance } from 'axios';
import globalConfig from 'config';

export const apiWorkSpace = axios.create({
    baseURL: `${globalConfig.services.apiWorkSpace}/api`,
});

export const gatewayURL = globalConfig.services.rtc;

export const api = axios.create({
    baseURL: `${globalConfig.services.rtc}/api`,
});

export const apiForFiles = axios.create({
    baseURL: `${globalConfig.services.files}/api`,
});

export const apiForDiscussion = axios.create({
    baseURL: `${globalConfig.services.discussion}/api`,
});

export default api;
