import {GenericResponseType, PostsResponseType} from "./api-types";
import {IChipData, IComment, IPost} from "../types/types";
import instance from "./api";

const baseUrl = 'posts';
export const postAPI = {
    getAll(query: string) {
        return instance
            .get<PostsResponseType>(`${baseUrl}${query}`)
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

    getPopularTags() {
        return instance
            .get<GenericResponseType<IChipData[]>>(`tags`)
            .then(response => {
                return response.data
            })
    },

    markPostFavorite(postId: string) {
        return instance
            .put<GenericResponseType<void>>(`${baseUrl}/${postId}/like`)
            .then(response => {
                return response.data
            })
    },

    toggleRating(postId: string, rating: number) {
        return instance
            .put<GenericResponseType<void>>(`${baseUrl}/${postId}/rating?rating=${rating}`)
            .then(response => {
                return response.data
            })
    },

    getPopular() {
        return instance
            .get<GenericResponseType<IPost[]>>(`${baseUrl}/popular`)
            .then(response => {
                return response.data
            })
    },

    getRecommendationPost(originPostId: string) {
        return instance
            .get<GenericResponseType<IPost[]>>(`${baseUrl}/recommendations?postId=${originPostId}`)
            .then(response => {
                return response.data
            })
    },

    getOne(postId: string) {
        return instance
            .get<GenericResponseType<IPost>>(`${baseUrl}/${postId}`)
            .then(response => {
                return response.data
            })
    },

    createPost(data: FormData) {
        return instance
            .post<GenericResponseType<IPost>>(`${baseUrl}`, data, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            .then(response => {
                return response.data
            })
    },

    updatePost(data: FormData, id: string) {
        return instance
            .put<GenericResponseType<void>>(
                `${baseUrl}/${id}`,
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
            .delete<GenericResponseType<void>>(`${baseUrl}/${postId}`,)
            .then(response => {
                return response.data
            });
    },

    createPostComment(comment: IComment, postId: string) {
        return instance
            .post<GenericResponseType<IPost>>(`${baseUrl}/${postId}/comment`, comment)
            .then(response => {
                return response.data
            })
    }
};
