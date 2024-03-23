import {ResultCodeEnum} from '../../api/api-types';
import {IComment, IPost, IPostEdit} from '../../types/types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {postAPI} from '../../api/post-api';
import {darken} from '@mui/material';

const UNDEFINED_ERROR = "Неизвестная ошибка"

export const getAllPosts = createAsyncThunk<IPost[], {query: string}, { rejectValue: string }>(
    'posts', async (data, thunkAPI) => {
        const response = await postAPI.getAll(data.query);
        try {
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.data;
        } catch(e) {
            return thunkAPI.rejectWithValue(UNDEFINED_ERROR);
        }
    }
);

export const markPostFavorite = createAsyncThunk<void, { postId: string }, { rejectValue: string }>(
    'posts/favorite', async (data, thunkAPI) => {
        const response = await postAPI.markPostFavorite(data.postId);
        try {
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.data;
        } catch(e) {
            return thunkAPI.rejectWithValue(UNDEFINED_ERROR);
        }
    }
);

export const getPopularPost = createAsyncThunk<IPost, {}, { rejectValue: string }>(
    'posts/popular', async (__, thunkAPI) => {
        const response = await postAPI.getPopular();
        try {
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.data;
        } catch(e) {
            return thunkAPI.rejectWithValue(UNDEFINED_ERROR);
        }
    }
);

export const getOnePost = createAsyncThunk<IPost, { postId: string }, { rejectValue: string }>(
    'posts/one', async (data, thunkAPI) => {
        try {
            const response = await postAPI.getOne(data.postId);
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message)
            }
            return response.data;
        } catch(e) {
            return thunkAPI.rejectWithValue(UNDEFINED_ERROR);
        }
    }
);

export const editPost = createAsyncThunk<void, { post: IPostEdit, id: string }, { rejectValue: string }>(
    'posts/edit', async (data, thunkAPI) => {
        try {
            const response = await postAPI.updatePost(data.post, data.id);
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message)
            }
            thunkAPI.dispatch(getAllPosts({query: ''}));
            return response.data;
        } catch(e) {
            return thunkAPI.rejectWithValue(UNDEFINED_ERROR);
        }
    }
);

export const createPost = createAsyncThunk<IPost, { post: IPostEdit }, { rejectValue: string }>(
    'posts/create', async (data, thunkAPI) => {
        try {
            const response = await postAPI.createPost(data.post);
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message)
            }
            return response.data;
        } catch(e) {
            return thunkAPI.rejectWithValue(UNDEFINED_ERROR);
        }

    }
);

export const deletePost = createAsyncThunk<void, { payload: IPost }, { rejectValue: string }>(
    'posts/delete', async (data, thunkAPI) => {
        try {
            const response = await postAPI.deletePost(data.payload._id);
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message)
            }
            return response.data;
        } catch(e) {
            return thunkAPI.rejectWithValue(UNDEFINED_ERROR);
        }
    }
);

export const getLastTags = createAsyncThunk<string[], {}, { rejectValue: string }>(
    'posts/tags', async (__, thunkAPI) => {
        const response = await postAPI.getLastTags();
        try {
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.data;
        } catch(e) {
            return thunkAPI.rejectWithValue(UNDEFINED_ERROR);
        }
    }
);

export const createPostComment = createAsyncThunk<IPost, { comment: IComment, postId: string }, { rejectValue: string }>(
    'comments/create', async (data, thunkAPI) => {
        try {
            const response = await postAPI.createPostComment(data.comment, data.postId);
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message)
            }
            thunkAPI.dispatch(getOnePost({postId: data.postId}));
            return response.data;
        } catch(e) {
            return thunkAPI.rejectWithValue(UNDEFINED_ERROR);
        }

    }
);
