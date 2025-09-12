import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { loginAPI } from '../../api';
import { ResultCodes } from '../../api/api-types';
import { ACCESS_DENIED } from '../../lib';
import { ILoginData, TUser } from '../../types';
// eslint-disable-next-line no-restricted-imports
import { appActions } from '../apps';
import { profileActions } from '../profile';

import { authActions } from './auth-slice';

export type RegisterDataType = {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
};

export const login = createAsyncThunk<
  TUser | undefined,
  { userData: ILoginData },
  NonNullable<unknown>
>('auth/login', async (data, thunkAPI) => {
  try {
    const response = await loginAPI.login(data.userData);
    if (response.resultCode === ResultCodes.Success) {
      if ('token' in response) {
        window?.localStorage?.setItem('token', response.token);
      }
      thunkAPI.dispatch(profileActions.setProfile(response.data));
      return response.data;
    }
    thunkAPI.dispatch(authActions.setGlobalError(response.message));
    thunkAPI.dispatch(authActions.logout());
    thunkAPI.dispatch(appActions.setUninitialized());
    thunkAPI.rejectWithValue(response.message);
  } catch (e) {
    thunkAPI.dispatch(
      authActions.setGlobalError((e as AxiosError<any>).response?.data?.message) || ACCESS_DENIED,
    );
    thunkAPI.rejectWithValue(ACCESS_DENIED);
    thunkAPI.dispatch(authActions.logout());
    thunkAPI.dispatch(appActions.setUninitialized());
  }
});

export const registerUser = createAsyncThunk<
  TUser | undefined,
  { userData: RegisterDataType },
  NonNullable<unknown>
>('auth/register', async (data, thunkAPI) => {
  try {
    const response = await loginAPI.register(data.userData);
    if (response.resultCode === ResultCodes.Success) {
      if ('token' in response) {
        window?.localStorage?.setItem('token', response.token);
      }
      return response.data;
    }
  } catch (e: any) {
    if (e.response.data.resultCode === ResultCodes.ValidationError) {
      thunkAPI.dispatch(authActions.setErrors(e.response.data.data));
    } else {
      thunkAPI.rejectWithValue(e.response.data.message);
      thunkAPI.dispatch(authActions.setGlobalError(e.response.data.message));
    }
    thunkAPI.dispatch(authActions.logout());
    thunkAPI.dispatch(appActions.setUninitialized());
  }
});
