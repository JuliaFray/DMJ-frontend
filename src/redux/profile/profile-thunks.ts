import {profileAPI} from '../../api/profile-api';
import {ResultCodeEnum} from '../../api/api-types';
import {IProfile, IProfileStats} from '../../types/types';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const getUserProfile = createAsyncThunk<IProfile, { userId: string }, { rejectValue: string }>(
    'profile', async (data, thunkAPI) => {
        const response = await profileAPI.getProfile(data.userId);
        if(response.resultCode === ResultCodeEnum.Error) {
            return thunkAPI.rejectWithValue(response.message)
        }
        return response?.data;
    }
);

export const getUserProfileStats = createAsyncThunk<IProfileStats, { userId: string }, { rejectValue: string }>(
    'profile/stats', async (data, thunkAPI) => {
        const response = await profileAPI.getStats(data.userId);
        if(response.resultCode === ResultCodeEnum.Error) {
            return thunkAPI.rejectWithValue(response.message)
        }
        return response?.data;
    }
);

export const saveUserProfile = createAsyncThunk<void, { profileId: string, file: FormData }, { rejectValue: string }>(
    'profile/save', async (data, thunkAPI) => {
        const response = await profileAPI.saveProfile(data.profileId, data.file);

        if(response.resultCode === ResultCodeEnum.Error) {
            return thunkAPI.rejectWithValue(response.message)
        }
        return response.data;
    }
);

export const toggleFollowProfile = createAsyncThunk<void, { profileId: string, query: string }, { rejectValue: string }>(
    'profile/follow', async (data, thunkAPI) => {
        const response = await profileAPI.toggleFollowUser(data.profileId, data.query);

        if(response.resultCode === ResultCodeEnum.Error) {
            return thunkAPI.rejectWithValue(response.message)
        }
        return response.data;
    }
);
