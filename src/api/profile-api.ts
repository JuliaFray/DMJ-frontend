import {GenericResponseType, PhotoResponseType} from "./api-types";
import {ProfileType} from "../types/types";
import {instance} from "./api";
import {UploadFile} from 'antd/es/upload/interface';

export const profileAPI = {
    getProfile(userId: number) {
        return instance
            .get<ProfileType>(`profile/${userId}`)
            .then(response => {
                return response.data
            })
    },

    getStatus(userId: number) {
        return instance
            .get<string>(`profile/status/${userId}`)
            .then(response => {
                return response.data
            })
    },

    updateStatus(status: string) {
        return instance
            .put<GenericResponseType>(`profile/status`, {status: status})
            .then(response => {
                return response.data
            })
    },

    savePhoto(photos: UploadFile) {
        return instance
            .post<GenericResponseType<PhotoResponseType>>(`profile/photo`, photos, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            .then(response => {
                return response.data
            })
    },

    saveProfile(profile: ProfileType) {
        return instance
            .put<GenericResponseType>(`profile`, profile)
            .then(response => {
                return response.data
            });
    }
};
