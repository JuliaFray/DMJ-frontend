import {GenericResponseType} from "./api-types";
import {PostEditType, PostType} from "../types/types";
import instance from "./api";
import {markPostFavorite} from '../redux/posts/posts-thunks';

export const postAPI = {
    getAll() {
        return instance
            .get<GenericResponseType<PostType[]>>(`posts`)
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
            .get<GenericResponseType<PostType>>(`posts/popular`)
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
