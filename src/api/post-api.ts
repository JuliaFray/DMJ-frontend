import {GenericResponseType} from "./api-types";
import {PostEditType, PostType} from "../types/types";
import instance from "./api";

export const postAPI = {
    getAll() {
        return instance
            .get<GenericResponseType<PostType[]>>(`posts`)
            .then(response => {
                return response.data
            })
    },

    getOne(postId: string) {
        return instance
            .get<GenericResponseType<PostType>>(`posts/${postId}`)
            .then(response => {
                return response.data
            })
    },

    createPost(post: PostEditType) {
        return instance
            .post<GenericResponseType<PostType>>(`posts`, post)
            .then(response => {
                return response.data
            })
    },

    updatePost(post: PostEditType, id: string) {
        return instance
            .put<GenericResponseType<void>>(`posts/${id}`, {...post})
            .then(response => {
                return response.data
            })
    },

    deletePost(postId: string) {
        return instance
            .delete<GenericResponseType<void>>(`posts/${postId}`,)
            .then(response => {
                return response.data
            });
    }
};
