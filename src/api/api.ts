import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
    baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});

export default instance;
