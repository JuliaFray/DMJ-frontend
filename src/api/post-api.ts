import {GenericResponseType} from "./api-types";
import {IComment, IPost, IPostEdit} from "../types/types";
import instance from "./api";

export const postAPI = {
    getAll() {
        return instance
            .get<GenericResponseType<IPost[]>>(`posts`)
            .then(response => {
                return response.data
            })
    },

    getLastTags() {
        return instance
            .get<GenericResponseType<string[]>>(`tags`)
            .then(response => {
                return response.data
            })
    },

    markPostFavorite(postId: string) {
        return instance
            .put<GenericResponseType<void>>(`posts/${postId}/like`)
            .then(response => {
                return response.data
            })
    },

    getPopular() {
        return instance
            .get<GenericResponseType<IPost>>(`posts/popular`)
            .then(response => {
                return response.data
            })
    },

    getOne(postId: string) {
        return instance
            .get<GenericResponseType<IPost>>(`posts/${postId}`)
            .then(response => {
                return response.data
            })
    },

    createPost(post: IPostEdit) {
        return instance
            .post<GenericResponseType<IPost>>(`posts`, post)
            .then(response => {
                return response.data
            })
    },

    updatePost(post: IPostEdit, id: string) {
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
    },

    createPostComment(comment: IComment, postId: string) {
        return instance
            .post<GenericResponseType<IPost>>(`posts/${postId}/comment`, comment)
            .then(response => {
                return response.data
            })
    },
};
