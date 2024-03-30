import {authAPI} from '../../api/auth-api';
import {ResultCodeEnum} from '../../api/api-types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {loginAPI} from '../../api/login-api';
import {appActions} from '../app/app-slice';
import {ILoginData, IUser} from '../../types/types';
import {authActions} from './auth-slice';
import {RegisterDataType} from '../../Components/Registration/Registration';
import {AxiosError} from 'axios';

const ACCESS_DENIED = 'Доступ запрещен'

export const checkAuth = createAsyncThunk<string, {}>(
    'auth/status', async (data, thunkAPI) => {
        try {
            const response = await authAPI.checkStatus();
            if(response.resultCode === ResultCodeEnum.Success) {
                thunkAPI.dispatch(appActions.setInitialized());
                return response.data;
            } else {
                thunkAPI.dispatch(authActions.logout());
                thunkAPI.dispatch(appActions.setUninitialized());
                return '';
            }
        } catch(e) {
            thunkAPI.rejectWithValue(ACCESS_DENIED);
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return '';
        }
    }
);

export const login = createAsyncThunk<IUser | undefined,
    { userData: ILoginData },
    {}>
(
    'auth/login', async (data, thunkAPI) => {
        try {
            const response = await loginAPI.login(data.userData);
            if(response.resultCode === ResultCodeEnum.Success) {
                if('token' in response) {
                    window?.localStorage?.setItem('token', response.token)
                }
                return response.data;
            } else {

                thunkAPI.dispatch(authActions.setGlobalError(response.message));
                thunkAPI.dispatch(authActions.logout());
                thunkAPI.dispatch(appActions.setUninitialized());
                thunkAPI.rejectWithValue(response.message);
            }
        } catch(e) {
            thunkAPI.dispatch(authActions.setGlobalError(
                (e as AxiosError<any>).response?.data?.message) || ACCESS_DENIED
            );
            thunkAPI.rejectWithValue(ACCESS_DENIED);
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
        }
    }
);

export const registerUser = createAsyncThunk<IUser | undefined,
    { userData: RegisterDataType },
    {}>
(
    'auth/register', async (data, thunkAPI) => {
        try {
            const response = await loginAPI.register(data.userData);
            if(response.resultCode === ResultCodeEnum.Success) {
                if('token' in response) {
                    window?.localStorage?.setItem('token', response.token)
                }
                return response.data;
            }
        } catch(e: any) {
            if(e.response.data.resultCode === ResultCodeEnum.ValidationError) {
                thunkAPI.dispatch(authActions.setErrors(e.response.data.data));
            } else {
                thunkAPI.rejectWithValue(e.response.data.message);
                thunkAPI.dispatch(authActions.setGlobalError(e.response.data.message));
            }
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());

        }
    }
);
