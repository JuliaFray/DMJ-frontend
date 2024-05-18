import {createAsyncThunk} from '@reduxjs/toolkit';
import {PostsResponseType, ResultCodeEnum} from '../../api/api-types';
import {dialogAPI} from '../../api/dialog-api';
import {authActions} from '../auth/auth-slice';
import {appActions} from '../app/app-slice';
import {ACCESS_DENIED} from '../../Utils/DictConstants';


const UNDEFINED_ERROR = "Неизвестная ошибка"

export const getAllDialogs = createAsyncThunk<PostsResponseType, { query: string }>(
    'dialogs', async (data, thunkAPI) => {
        try {
            const response = await dialogAPI.getAllDialogs(data.query);
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(UNDEFINED_ERROR);
            }
            return response;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }
    }
);

export const getMessagesByDialog = createAsyncThunk<PostsResponseType, { query: string }>(
    'messages', async (data, thunkAPI) => {
        try {
            const response = await dialogAPI.getMessagesByDialog(data.query);
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(UNDEFINED_ERROR);
            }
            return response;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }
    }
);

export const getUsersWithStatus = createAsyncThunk<PostsResponseType, { query: string }>(
    'users', async (data, thunkAPI) => {
        try {
            const response = await dialogAPI.getUsersWithStatus(data.query);
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(UNDEFINED_ERROR);
            }
            return response;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }
    }
);