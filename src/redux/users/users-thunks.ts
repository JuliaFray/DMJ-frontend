import {usersAPI} from '../../api/users-api';
import {ResultCodeEnum, UsersResponseType} from '../../api/api-types';
import {createAsyncThunk} from '@reduxjs/toolkit';

const ERROR = 'error'

export const getAllUsers = createAsyncThunk<UsersResponseType, { currentPage: number }>(
    'users', async (data, thunkAPI) => {
        const response = await usersAPI.getUsers(data.currentPage, null);
        if(response.resultCode === ResultCodeEnum.Error) {
            return thunkAPI.rejectWithValue(ERROR)
        }
        return response;
    }
);
