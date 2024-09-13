import {createAsyncThunk} from '@reduxjs/toolkit';
import {appActions} from 'shared/model/app/app-slice';
import {authActions} from 'shared/model/auth/auth-slice';
import {ACCESS_DENIED} from '../../lib/DictConstants';
import {ResultCodeEnum, UsersResponseType} from './../../api/api-types';
import {usersAPI} from './../../api/users-api';

const ERROR = 'error'

export const getAllUsers = createAsyncThunk<UsersResponseType,
    { currentPage: number, isFollowers: boolean, userId?: string }>(
    'users', async (data, thunkAPI) => {
        try {
            const response = await usersAPI.getUsers(data.currentPage, data.isFollowers, null, data.userId);
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(ERROR)
            }
            return response;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }
    }
);
