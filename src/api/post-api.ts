import {GenericResponseType, PhotoResponseType} from "./api-types";
import {PostType, ProfileType} from "../types/types";
import instance from "./api";
import {UploadFile} from 'antd/es/upload/interface';

export const postAPI = {
    getAll() {
        return instance
            .get<GenericResponseType<PostType[]>>(`posts`)
            .then(response => {
                return response.data
            })
    },

    getOne(userId: string) {
        return instance
            .get<string>(`profile/status/${userId}`)
            .then(response => {
                return response.data
            })
    },

    createPost(post: PostType) {
        return instance
            .post<GenericResponseType>(`posts`, post)
            .then(response => {
                return response.data
            })
    },

    updatePost(photos: UploadFile) {
        return instance
            .post<GenericResponseType<PhotoResponseType>>(`profile/photo`, photos, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            .then(response => {
                return response.data
            })
    },

    deletePost(profile: ProfileType) {
        return instance
            .put<GenericResponseType>(`profile`, profile)
            .then(response => {
                return response.data
            });
    }
};
