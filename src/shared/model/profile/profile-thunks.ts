import {createAsyncThunk} from '@reduxjs/toolkit';
import {TProfile, TProfileStats} from 'entities/profile';
import {ACCESS_DENIED} from '../../lib/DictConstants';
import {ResultCodeEnum} from './../../api/api-types';
import {profileAPI} from './../../api/profile-api';
import {appActions} from './../app/app-slice';
import {authActions} from './../auth/auth-slice';

export const getUserProfile = createAsyncThunk<TProfile, { userId: string }, { rejectValue: string }>(
    'profile', async (data, thunkAPI) => {
        try {
            const response = await profileAPI.getProfile(data.userId);
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message)
            }
            return response?.data;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }
    }
);

export const getUserProfileStats = createAsyncThunk<TProfileStats, { userId: string }, { rejectValue: string }>(
    'profile/stats', async (data, thunkAPI) => {
        try {
            const response = await profileAPI.getStats(data.userId);
            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message)
            }
            return response?.data;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }
    }
);

export const saveUserProfile = createAsyncThunk<void, { profileId: string, file: FormData }, { rejectValue: string }>(
    'profile/save', async (data, thunkAPI) => {
        try {
            const response = await profileAPI.saveProfile(data.profileId, data.file);

            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message)
            }
            return response.data;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }
    }
);

export const toggleFollowProfile = createAsyncThunk<void, { profileId: string, query: string, userId: string }, { rejectValue: string }>(
    'profile/follow', async (data, thunkAPI) => {
        try {
            const response = await profileAPI.toggleFollowUser(data.profileId, data.query);

            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message)
            }
            thunkAPI.dispatch(getUserProfile({userId: data.userId}))
            return response.data;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }
    }
);

export const createFriendProfile = createAsyncThunk<void, { profileId: string, query: string }, { rejectValue: string }>(
    'profile/friend', async (data, thunkAPI) => {
        try {
            const response = await profileAPI.createFriendUser(data.profileId, data.query);

            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message)
            }
            return response.data;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }
    }
);

export const toggleFriendProfile = createAsyncThunk<void, { userId: string, query: string }, { rejectValue: string }>(
    'profile/toggle-friend', async (data, thunkAPI) => {
        try {
            const response = await profileAPI.toggleFriendUser(data.userId, data.query);

            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message)
            }
            return response.data;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }
    }
);

export const getNotifications = createAsyncThunk<void, { userId: string }, { rejectValue: string }>(
    'profile/toggle-friend', async (data, thunkAPI) => {
        try {
            const response = await profileAPI.getNotifications(data.userId);

            if(response.resultCode === ResultCodeEnum.Error) {
                return thunkAPI.rejectWithValue(response.message)
            }
            return response.data;
        } catch(e) {
            thunkAPI.dispatch(authActions.logout());
            thunkAPI.dispatch(appActions.setUninitialized());
            return thunkAPI.rejectWithValue(ACCESS_DENIED);
        }
    }
);
