import {createSlice} from '@reduxjs/toolkit';
import {TProfile, TProfileStats} from 'entities/profile';
import {createFriendProfile, getUserProfile, getUserProfileStats, saveUserProfile, toggleFollowProfile, toggleFriendProfile} from './profile-thunks';

type InitialStateType = {
    profile: TProfile | null,
    isFetching?: boolean,
    stats: TProfileStats | null,
    my: TProfile | null,
}

const initialState: InitialStateType = {
    profile: null,
    isFetching: false,
    stats: null,
    my: null
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.my = action.payload;
        },
    },
    extraReducers: (builder) => {
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
            })
            .addCase(saveUserProfile.rejected, (state, action) => {
                state.isFetching = false;
            })
            //=====toggleFollowProfile=====//
            .addCase(toggleFollowProfile.pending, (state, action) => {
                state.isFetching = true;
            })
            .addCase(toggleFollowProfile.fulfilled, (state, action) => {
                state.isFetching = false;
            })
            .addCase(toggleFollowProfile.rejected, (state, action) => {
                state.isFetching = false;
            })
            //=====createFriendProfile=====//
            .addCase(createFriendProfile.pending, (state, action) => {
                state.isFetching = true;
            })
            .addCase(createFriendProfile.fulfilled, (state, action) => {
                state.isFetching = false;
            })
            .addCase(createFriendProfile.rejected, (state, action) => {
                state.isFetching = false;
            })
            //=====toggleFriendProfile=====//
            .addCase(toggleFriendProfile.pending, (state, action) => {
                state.isFetching = true;
            })
            .addCase(toggleFriendProfile.fulfilled, (state, action) => {
                state.isFetching = false;
            })
            .addCase(toggleFriendProfile.rejected, (state, action) => {
                state.isFetching = false;
            })
    }
});

const profileActions = profileSlice.actions;
const profileReducer = profileSlice.reducer;

export {profileSlice, profileActions, profileReducer}
