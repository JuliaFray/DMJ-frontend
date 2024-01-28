import {FilterType} from '../../types/types';
import {usersAPI} from '../../api/users-api';
import {GenericResponseType, ResultCodeEnum, UsersResponseType} from '../../api/api-types';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const getAllUsers = createAsyncThunk<UsersResponseType, { pageSize: number, currentPage: number, filter: FilterType }>(
    'auth/status', async (data, thunkAPI) => {
        const response = await usersAPI.getUsers(data.pageSize, data.currentPage, data.filter);
        if(response.resultCode === ResultCodeEnum.Error) {
            return thunkAPI.rejectWithValue(response.message)
        }
        return response.data;
    }
);

export const followUser = createAsyncThunk<void, { userId: string }>(
    'users/follow', async (data, thunkAPI) => {
        _followUnfollowFlow({userId: data.userId, apiMethod: usersAPI.followUsers.bind(usersAPI)});
    }
);

export const unfollowUser = createAsyncThunk<void, { userId: string }>(
    'users/unfollow', async (data, thunkAPI) => {
        _followUnfollowFlow({userId: data.userId, apiMethod: usersAPI.unfollowUsers.bind(usersAPI)});
    }
);

export const _followUnfollowFlow = createAsyncThunk<void, { userId: string, apiMethod: (userId: string) => Promise<GenericResponseType<void>> }>(
    'users/toggleFollow', async (data, thunkAPI) => {
        const response = await data.apiMethod(data.userId);
        if(response.resultCode === ResultCodeEnum.Error) {
            return thunkAPI.rejectWithValue(response.message)
        }
        return response.data;
    }
);
