import {GenericResponseType, LoginResponseType} from "./api-types";
import instance from "./api";
import {LoginDataType} from '../Components/Login/LoginForm';

export const loginAPI = {
    register(data: LoginDataType) {
        return instance
            .post<LoginResponseType>(`auth/register`, data)
            .then(response => {
                return response.data
            })
    },

    login(data: LoginDataType) {
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
