import { createSlice } from '@reduxjs/toolkit';

import { TProfile, TProfileStats } from '../../types';

import {
  createFriendProfile,
  getUserProfile,
  getUserProfileStats,
  saveUserProfile,
  toggleFollowProfile,
  toggleFriendProfile,
} from './profile-thunks';

type InitialStateType = {
  profile: TProfile | null;
  isFetching?: boolean;
  stats: TProfileStats | null;
  my: TProfile | null;
};

const initialState: InitialStateType = {
  profile: null,
  isFetching: false,
  stats: null,
  my: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state: InitialStateType, action) => {
      state.my = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //= ====getUserProfile=====//
      .addCase(getUserProfile.pending, (state) => {
        state.isFetching = true;
        state.profile = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isFetching = false;
        state.profile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.isFetching = false;
        state.profile = null;
      })
      //= ====getUserProfileStats=====//
      .addCase(getUserProfileStats.pending, (state) => {
        state.isFetching = true;
        state.stats = null;
      })
      .addCase(getUserProfileStats.fulfilled, (state, action) => {
        state.isFetching = false;
        state.stats = action.payload;
      })
      .addCase(getUserProfileStats.rejected, (state) => {
        state.isFetching = false;
        state.stats = null;
      })
      //= ====saveUserProfile=====//
      .addCase(saveUserProfile.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(saveUserProfile.fulfilled, (state) => {
        state.isFetching = false;
      })
      .addCase(saveUserProfile.rejected, (state) => {
        state.isFetching = false;
      })
      //= ====toggleFollowProfile=====//
      .addCase(toggleFollowProfile.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(toggleFollowProfile.fulfilled, (state) => {
        state.isFetching = false;
      })
      .addCase(toggleFollowProfile.rejected, (state) => {
        state.isFetching = false;
      })
      //= ====createFriendProfile=====//
      .addCase(createFriendProfile.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(createFriendProfile.fulfilled, (state) => {
        state.isFetching = false;
      })
      .addCase(createFriendProfile.rejected, (state) => {
        state.isFetching = false;
      })
      //= ====toggleFriendProfile=====//
      .addCase(toggleFriendProfile.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(toggleFriendProfile.fulfilled, (state) => {
        state.isFetching = false;
      })
      .addCase(toggleFriendProfile.rejected, (state) => {
        state.isFetching = false;
      });
  },
});

const profileActions = profileSlice.actions;
const profileReducer = profileSlice.reducer;

export { profileSlice, profileActions, profileReducer };
