import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {"API-KEY": '9b5c704f-1c0c-466c-a264-da866cc90a5f'}
});
