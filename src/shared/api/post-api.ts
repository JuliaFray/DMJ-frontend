import {BaseQueryFn, createApi, EndpointBuilder} from '@reduxjs/toolkit/query/react';
import {TArticle} from "entities/article";
import {TComment} from "entities/comment";
import {TChipData} from "entities/tag";
import customFetchBase from "shared/api/custom-fetch-base";
import instance from "./api";
import {GenericResponseType, PostsResponseType} from "./api-types";

const baseUrl = 'posts';
export const postAPI = {
    getPopularTags() {
        return instance
            .get<GenericResponseType<TChipData[]>>(`tags`)
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
            .get<GenericResponseType<TArticle[]>>(`${baseUrl}/popular`)
            .then(response => {
                return response.data
            })
    },

    getRecommendationPost(originPostId: string) {
        return instance
            .get<GenericResponseType<TArticle[]>>(`${baseUrl}/recommendations?postId=${originPostId}`)
            .then(response => {
                return response.data
            })
    },

    getOne(postId: string) {
        return instance
            .get<GenericResponseType<TArticle>>(`${baseUrl}/${postId}`)
            .then(response => {
                return response.data
            })
    },

    createPost(data: FormData) {
        return instance
            .post<GenericResponseType<TArticle>>(`${baseUrl}`, data, {
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

    createPostComment(comment: TComment, postId: string) {
        return instance
            .post<GenericResponseType<TArticle>>(`${baseUrl}/${postId}/comment`, comment)
            .then(response => {
                return response.data
            })
    },

    toggleCommentRating(commentId: string, rating: number) {
        return instance
            .put<GenericResponseType<void>>(`${baseUrl}/${commentId}/comment-rating?rating=${rating}`)
            .then(response => {
                return response.data
            })
    },

    getUserPostComments(userId: string) {
        return instance
            .get<GenericResponseType<TArticle[]>>(`${baseUrl}/post-comments?userId=${userId}`)
            .then(response => {
                return response.data
            })
    },
};
export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: customFetchBase,
    endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
        getAllArticles: build.query<PostsResponseType, { searchParams: string }>({
            query: ({searchParams}) => {
                return {
                    url: `${baseUrl}${searchParams}`,
                    method: 'GET',
                }
            },
        }),
        getAllTags: build.query<GenericResponseType<TChipData[]>, {}>({
            query: ({}) => {
                return {
                    url: `all-tags`,
                    method: 'GET',
                }
            },
        })
    })
});

export const {useLazyGetAllArticlesQuery, useLazyGetAllTagsQuery} = articleApi;
