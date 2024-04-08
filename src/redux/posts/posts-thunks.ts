import {ResultCodeEnum} from '../../api/api-types';
import {IChipData, IComment, IPost} from '../../types/types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {postAPI} from '../../api/post-api';

const UNDEFINED_ERROR = "Неизвестная ошибка"

export const getAllPosts = createAsyncThunk<IPost[], { query: string }, { rejectValue: string }>(
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

export const togglePostRating = createAsyncThunk<void, { postId: string, rating: number }, { rejectValue: string }>(
    'posts/rating', async (data, thunkAPI) => {
        const response = await postAPI.toggleRating(data.postId, data.rating);
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

export const editPost = createAsyncThunk<void, { file: FormData, id: string }, { rejectValue: string }>(
    'posts/edit', async (data, thunkAPI) => {
        try {
            const response = await postAPI.updatePost(data.file, data.id);
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

export const createPost = createAsyncThunk<IPost, { file: FormData }, { rejectValue: string }>(
    'posts/create', async (data, thunkAPI) => {
        try {
            const response = await postAPI.createPost(data.file);
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

export const getAllTags = createAsyncThunk<IChipData[], {}, { rejectValue: string }>(
    'posts/allTags', async (__, thunkAPI) => {
        const response = await postAPI.getAllTags();
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

export const getLastTags = createAsyncThunk<IChipData[], {}, { rejectValue: string }>(
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
