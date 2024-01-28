import {ResultCodeEnum} from '../../api/api-types';
import {PostEditType, PostType} from '../../types/types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {postAPI} from '../../api/post-api';

const UNDEFINED_ERROR = "Неизвестная ошибка"

export const getAllPosts = createAsyncThunk<PostType[], {}, { rejectValue: string }>(
    'posts', async (__, thunkAPI) => {
        const response = await postAPI.getAll();
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

export const getOnePost = createAsyncThunk<PostType, { postId: string }, { rejectValue: string }>(
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

export const editPost = createAsyncThunk<void, { post: PostEditType, id: string }, { rejectValue: string }>(
    'posts/edit', async (data, thunkAPI) => {
        try {
            const response = await postAPI.updatePost(data.post, data.id);
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message)
            }
            thunkAPI.dispatch(getAllPosts({}));
            return response.data;
        } catch(e) {
            return thunkAPI.rejectWithValue(UNDEFINED_ERROR);
        }
    }
);

export const createPost = createAsyncThunk<PostType, { post: PostEditType }, { rejectValue: string }>(
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

export const deletePost = createAsyncThunk<void, { payload: PostType }, { rejectValue: string }>(
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
