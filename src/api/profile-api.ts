import {GenericResponseType} from "./api-types";
import {IProfile} from "../types/types";
import instance from "./api";

export const profileAPI = {
    getProfile(userId: string) {
        return instance
            .get<GenericResponseType<IProfile>>(`profile/${userId}`)
            .then(response => {
                return response.data
            })
    },

    updateStatus(status: string) {
        return instance
            .put<GenericResponseType<void>>(`profile/status`, {status: status})
            .then(response => {
                return response.data
            })
    },

    savePhoto(userId: string, data: FormData) {
        return instance
            .post<GenericResponseType<any>>(`profile/${userId}/photo`, data, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            .then(response => {
                return response.data
            })
    },

    saveProfile(profile: IProfile) {
        return instance
            .put<GenericResponseType<void>>(`profile`, profile)
            .then(response => {
                return response.data
            });
    }
};
