import {profileAPI} from '../../api/profile-api';
import {ResultCodeEnum} from '../../api/api-types';
import {IProfile, IProfileStats} from '../../types/types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {authActions} from '../auth/auth-slice';
import {appActions} from '../app/app-slice';
import {ACCESS_DENIED} from '../../Utils/DictConstants';

export const getUserProfile = createAsyncThunk<IProfile, { userId: string }, { rejectValue: string }>(
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

export const getUserProfileStats = createAsyncThunk<IProfileStats, { userId: string }, { rejectValue: string }>(
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

export const toggleFollowProfile = createAsyncThunk<void, { profileId: string, query: string }, { rejectValue: string }>(
    'profile/follow', async (data, thunkAPI) => {
        try {
            const response = await profileAPI.toggleFollowUser(data.profileId, data.query);

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

export const toggleFriendProfile = createAsyncThunk<void, { profileId: string, query: string }, { rejectValue: string }>(
    'profile/friend', async (data, thunkAPI) => {
        try {
            const response = await profileAPI.toggleFriendUser(data.profileId, data.query);

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
