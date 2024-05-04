import {GenericResponseType} from "./api-types";
import {IProfile, IProfileStats} from "../types/types";
import instance from "./api";

export const profileAPI = {
    getProfile(userId: string) {
        return instance
            .get<GenericResponseType<IProfile>>(`profile/${userId}`)
            .then(response => {
                return response.data
            })
    },

    getStats(userId: string) {
        return instance
            .get<GenericResponseType<IProfileStats>>(`profile/${userId}/stats`)
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

    saveProfile(userId: string, data: FormData) {
        return instance
            .post<GenericResponseType<void>>(`profile/${userId}`, data, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            .then(response => {
                return response.data
            });
    },

    toggleFollowUser(userId: string, query: string) {
        return instance
            .put<GenericResponseType<void>>(`profile/${userId}/toggle-follow${query}`)
            .then(response => {
                return response.data
            });
    },
};
