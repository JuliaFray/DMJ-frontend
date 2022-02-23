import {GenericResponseType, LoginResponseType} from "./api-types";
import {instance} from "./api";

export const loginAPI = {
    login(email: string, password: string, rememeberMe = false, captcha: string | null = null) {
        return instance
            .post<GenericResponseType<LoginResponseType>>(`auth/login`, {email, password, rememeberMe, captcha})
            .then(response => {
                return response.data
            })
    },

    logout() {
        return instance
            .delete<GenericResponseType>(`auth/login`)
            .then(response => {
                return response.data
            })
    }
};
