import {GenericResponseType} from "./api-types";
import {IChipData, IComment, IPost} from "../types/types";
import instance from "./api";

export const postAPI = {
    getAll(query: string) {
        return instance
            .get<GenericResponseType<IPost[]>>(`posts${query}`)
            .then(response => {
                return response.data
            })
    },

    getAllTags() {
        return instance
            .get<GenericResponseType<IChipData[]>>(`all-tags`)
            .then(response => {
                return response.data
            })
    },

    getLastTags() {
        return instance
            .get<GenericResponseType<IChipData[]>>(`tags`)
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

    toggleRating(postId: string, rating: number) {
        return instance
            .put<GenericResponseType<void>>(`posts/${postId}/rating?rating=${rating}`)
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

    createPost(data: FormData) {
        return instance
            .post<GenericResponseType<IPost>>(`posts`, data, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            .then(response => {
                return response.data
            })
    },

    updatePost(data: FormData, id: string) {
        return instance
            .put<GenericResponseType<void>>(
                `posts/${id}`,
                data,
                {
                    headers: {'Content-Type': 'multipart/form-data'}
                }
            )
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
    }
};
