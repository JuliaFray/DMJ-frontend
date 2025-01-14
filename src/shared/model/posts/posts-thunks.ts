import {createAsyncThunk} from '@reduxjs/toolkit';
import {TArticle} from 'entities/article';
import {TComment} from 'entities/comment';
import {TChipData} from 'entities/tag';
import {ACCESS_DENIED} from '../../lib/DictConstants';
import {ResultCodeEnum} from './../../api/api-types';
import {postAPI} from './../../api/post-api';
import {appActions} from './../app/app-slice';
import {authActions} from './../auth/auth-slice';

const UNDEFINED_ERROR = "Неизвестная ошибка"

// export const getAllPosts = createAsyncThunk<PostsResponseType, { query: string }>(
//     'posts', async (data, thunkAPI) => {
//         try {
//             const response = await postAPI.getAll(data.query);
//             if(response.resultCode === ResultCodeEnum.Error) {
//                 return thunkAPI.rejectWithValue(UNDEFINED_ERROR);
//             }
//             return response;
//         } catch(e) {
//             thunkAPI.dispatch(authActions.logout());
//             thunkAPI.dispatch(appActions.setUninitialized());
//             return thunkAPI.rejectWithValue(ACCESS_DENIED);
//         }
//     }
// );

export const markPostFavorite = createAsyncThunk<void, { postId: string }, { rejectValue: string }>(
    'posts/favorite', async (data, thunkAPI) => {
        const response = await postAPI.markPostFavorite(data.postId);
        try {
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.data;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }
    }
);

export const togglePostRating = createAsyncThunk<void, { postId: string, rating: number }, { rejectValue: string }>(
    'posts/rating', async (data, thunkAPI) => {
        const response = await postAPI.toggleRating(data.postId, data.rating);
        try {
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.data;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }
    }
);

export const getPopularPost = createAsyncThunk<TArticle[], {}, { rejectValue: string }>(
    'posts/popular', async (__, thunkAPI) => {
        const response = await postAPI.getPopular();
        try {
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.data;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }
    }
);

export const getOnePost = createAsyncThunk<TArticle, { postId: string }, { rejectValue: string }>(
    'posts/one', async (data, thunkAPI) => {
        try {
            const response = await postAPI.getOne(data.postId);
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message)
            }
            return response.data;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }
    }
);

export const editPost = createAsyncThunk<void, { file: FormData, id: string }, { rejectValue: string }>(
    'posts/edit', async (data, thunkAPI) => {
        try {
            const response = await postAPI.updatePost(data.file, data.id);
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message)
            }
            // thunkAPI.dispatch(getAllPosts({query: ''}));
            return response.data;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }
    }
);

export const createPost = createAsyncThunk<TArticle, { file: FormData }, { rejectValue: string }>(
    'posts/create', async (data, thunkAPI) => {
        try {
            const response = await postAPI.createPost(data.file);
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message)
            }
            return response.data;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }

    }
);

export const deletePost = createAsyncThunk<void, { payload: TArticle }, { rejectValue: string }>(
    'posts/delete', async (data, thunkAPI) => {
        try {
            const response = await postAPI.deletePost(data.payload._id);
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message)
            }
            return response.data;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }
    }
);

// export const getAllTags = createAsyncThunk<TChipData[], {}, { rejectValue: string }>(
//     'posts/allTags', async (__, thunkAPI) => {
//         const response = await postAPI.getAllTags();
//         try {
//             if(response.resultCode === ResultCodeEnum.Error) {
//                 return thunkAPI.rejectWithValue(response.message);
//             }
//             return response.data;
//         } catch(e) {
//             thunkAPI.dispatch(authActions.logout());
//             thunkAPI.dispatch(appActions.setUninitialized());
//             return thunkAPI.rejectWithValue(ACCESS_DENIED);
//         }
//     }
// );

export const getPopularTags = createAsyncThunk<TChipData[], {}, { rejectValue: string }>(
    'posts/tags', async (__, thunkAPI) => {
        const response = await postAPI.getPopularTags();
        try {
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.data;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }
    }
);

export const createPostComment = createAsyncThunk<TArticle, { comment: TComment, postId: string }, { rejectValue: string }>(
    'comments/create', async (data, thunkAPI) => {
        try {
            const response = await postAPI.createPostComment(data.comment, data.postId);
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message)
            }
            thunkAPI.dispatch(getOnePost({postId: data.postId}));
            return response.data;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }

    }
);

export const getRecommendationPost = createAsyncThunk<TArticle[], { originPostId: string }, { rejectValue: string }>(
    'posts/recommendations', async (data, thunkAPI) => {
        const response = await postAPI.getRecommendationPost(data.originPostId);
        try {
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.data;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }
    }
);

export const toggleCommentRating = createAsyncThunk<void, { commentId: string, rating: number }, { rejectValue: string }>(
    'posts/commentRating', async (data, thunkAPI) => {
        const response = await postAPI.toggleCommentRating(data.commentId, data.rating);
        try {
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.data;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }
    }
);


export const getUserPostComments = createAsyncThunk<TArticle[], { userId: string }, { rejectValue: string }>(
    'posts/comments', async (data, thunkAPI) => {
        const response = await postAPI.getUserPostComments(data.userId);
        try {
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.data;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }
    }
);
