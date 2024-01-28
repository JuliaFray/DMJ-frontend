import {authAPI} from '../../api/auth-api';
import {ResultCodeEnum} from '../../api/api-types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {LoginDataType} from '../../Components/Login/LoginForm';
import {loginAPI} from '../../api/login-api';
import {appActions} from '../app/app-slice';
import {UserType} from '../../types/types';
import {authActions} from './auth-slice';

const ACCESS_DENIED = "Доступ запрещен"

export const checkAuth = createAsyncThunk<boolean, {}>(
    'auth/status', async (__, thunkAPI) => {
        try {
            const response = await authAPI.checkStatus();
            if(response.resultCode === ResultCodeEnum.Success) {
                thunkAPI.dispatch(appActions.setInitialized());
                return true;
            } else {
                thunkAPI.dispatch(authActions.logout());
                thunkAPI.dispatch(appActions.setUninitialized());
                return false;
            }
        } catch(e) {
            thunkAPI.rejectWithValue(ACCESS_DENIED);
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return false;
        }
    }
);

export const login = createAsyncThunk<UserType | undefined,
    { userData: LoginDataType },
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
                // thunkAPI.rejectWithValue(response.message);
                thunkAPI.dispatch(authActions.logout());
                thunkAPI.dispatch(appActions.setUninitialized());
            }
        } catch(e) {
            thunkAPI.rejectWithValue(ACCESS_DENIED);
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
        }
    }
);

// export const logout = createAsyncThunk<void | undefined, {}>(
//     'auth/logout', async () => {
//         const response = await authAPI.checkStatus();
//         if(response.resultCode === ResultCodeEnum.Success) {
//             return response.data;
//         }
//     }
// );

export const getCaptchaUrl = createAsyncThunk<void | undefined, {}>(
    'auth/captcha', async () => {
        const response = await authAPI.checkStatus();
        if(response.resultCode === ResultCodeEnum.Success) {
            return response?.data;
        }
    }
);
