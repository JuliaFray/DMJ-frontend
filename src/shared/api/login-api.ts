import {ILoginData} from '../../types/types';
import instance from './api';
import {GenericResponseType, LoginResponseType} from './api-types';

export const loginAPI = {
    register(data: ILoginData) {
        return instance
            .post<LoginResponseType>(`auth/register`, data)
            .then(response => {
                return response.data
            })
    },

    login(data: ILoginData) {
        return instance
            .post<LoginResponseType>(`auth/login`, data)
            .then(response => {
                return response.data
            })
    },

    logout() {
        return instance
            .delete<GenericResponseType<void>>(`auth/login`)
            .then(response => {
                return response.data
            })
    }
};
