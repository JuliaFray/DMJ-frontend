import {GenericResponseType, PhotoResponseType} from "./api-types";
import {IProfile} from "../types/types";
import instance from "./api";
import {UploadFile} from 'antd/es/upload/interface';

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

    savePhoto(photos: UploadFile) {
        return instance
            .post<GenericResponseType<PhotoResponseType>>(`profile/photo`, photos, {
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
