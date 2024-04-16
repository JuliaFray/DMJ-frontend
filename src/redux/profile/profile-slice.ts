import {IProfile, IProfileStats} from '../../types/types';
import {createSlice} from '@reduxjs/toolkit';
import {getUserProfile, getUserProfileStats, saveProfilePhoto, saveUserProfile} from './profile-thunks';

type InitialStateType = {
    profile: IProfile | null,
    isFetching?: boolean,
    stats: IProfileStats | null
}

const initialState: InitialStateType = {
    profile: null,
    isFetching: false,
    stats: null
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {}, extraReducers: (builder) => {
        builder
            //=====getUserProfile=====//
            .addCase(getUserProfile.pending, (state, action) => {
                state.isFetching = true;
                state.profile = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.isFetching = false;
                state.profile = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.isFetching = false;
                state.profile = null;
            })
            //=====getUserProfileStats=====//
            .addCase(getUserProfileStats.pending, (state, action) => {
                state.isFetching = true;
                state.stats = null;
            })
            .addCase(getUserProfileStats.fulfilled, (state, action) => {
                state.isFetching = false;
                state.stats = action.payload;
            })
            .addCase(getUserProfileStats.rejected, (state, action) => {
                state.isFetching = false;
                state.stats = null;
            })
            //=====saveUserProfile=====//
            .addCase(saveUserProfile.pending, (state, action) => {
                state.isFetching = true;
            })
            .addCase(saveUserProfile.fulfilled, (state, action) => {
                state.isFetching = false;
                if(state.profile) {
                    state.profile = action.meta.arg.profile;
                }
            })
            .addCase(saveUserProfile.rejected, (state, action) => {
                state.isFetching = false;
            })
            //=====saveProfilePhoto=====//
            .addCase(saveProfilePhoto.pending, (state, action) => {
                state.isFetching = true;
            })
            .addCase(saveProfilePhoto.fulfilled, (state, action) => {
                state.isFetching = false;
                if(state.profile && action.payload) {
                    state.profile.avatar = action.payload;
                    state.profile.avatarId = action.payload._id;
                }
            })
            .addCase(saveProfilePhoto.rejected, (state, action) => {
                state.isFetching = false;
            })
    }
});

export default profileSlice.reducer;
