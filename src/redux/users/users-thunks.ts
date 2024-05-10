import {usersAPI} from '../../api/users-api';
import {ResultCodeEnum, UsersResponseType} from '../../api/api-types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {authActions} from '../auth/auth-slice';
import {appActions} from '../app/app-slice';
import {ACCESS_DENIED} from '../../Utils/DictConstants';

const ERROR = 'error'

export const getAllUsers = createAsyncThunk<UsersResponseType,
    { currentPage: number, isFollowers: boolean, isFriends: boolean, userId?: string }>(
    'users', async (data, thunkAPI) => {
        try {
            const response = await usersAPI.getUsers(data.currentPage, data.isFollowers, data.isFriends, null, data.userId);
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
