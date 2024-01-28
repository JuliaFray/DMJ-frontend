import {profileAPI} from '../../api/profile-api';
import {ResultCodeEnum} from '../../api/api-types';
import {ProfileType} from '../../types/types';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const getUserProfile = createAsyncThunk<ProfileType, { userId: string }, { rejectValue: string }>(
    'profile', async (data, thunkAPI) => {
        const response = await profileAPI.getProfile(data.userId);
        if(response.resultCode === ResultCodeEnum.Error) {
            return thunkAPI.rejectWithValue(response.message)
        }
        return response?.data;
    }
);

export const updateUserStatus = createAsyncThunk<void, { status: string }, { rejectValue: string }>(
    'profile/status', async (data, thunkAPI) => {
        const response = await profileAPI.updateStatus(data.status);
        if(response.resultCode === ResultCodeEnum.Error) {
            return thunkAPI.rejectWithValue(response.message)
        }
        return response.data;
    }
);

// export const saveProfilePhoto = (photos: UploadFile): ThunkType => async (dispatch) => {
//     let response = await profileAPI.savePhoto(photos);
//     if(response.resultCode === ResultCodeEnum.Success) {
//         dispatch(actions.updatePhoto(response.data.photos))
//     }
// };
//
export const saveUserProfile = createAsyncThunk<void, { profile: ProfileType }, { rejectValue: string }>(
    'profile/save', async (data, thunkAPI) => {
        const response = await profileAPI.saveProfile(data.profile);

        if(response.resultCode === ResultCodeEnum.Error) {
            return thunkAPI.rejectWithValue(response.message)
        }
        return response.data;
    }
);
