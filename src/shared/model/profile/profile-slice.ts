import { createSlice } from '@reduxjs/toolkit';

import { authApi } from '../../api';
import { IUser, TProfileStats } from '../../types';

import {
  createFriendProfile,
  getUserProfile,
  getUserProfileStats,
  saveUserProfile,
  toggleFollowProfile,
  toggleFriendProfile,
} from './profile-thunks';

type InitialStateType = {
  profile: IUser | null;
  isFetching?: boolean;
  stats: TProfileStats | null;
  my: IUser | null;
};

const initialState: InitialStateType = {
  profile: null,
  isFetching: false,
  stats: null,
  my: null,
};

const profileSlice = createSlice({
  name: 'profileSlice',
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

    builder
      //= ====login=====//
      .addMatcher(authApi.endpoints.login.matchPending, (state) => {
        state.my = null;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        if (payload) {
          state.my = payload;
        }
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
        state.my = null;
      });
  },
  selectors: {
    getProfile: (state: InitialStateType) => state.profile,
    getMyProfile: (state: InitialStateType) => state.my,
    getMyProfileAvatar: (state: InitialStateType) => state.my?.avatar,
    getMyProfileFullName: (state: InitialStateType) => state.my?.login || '',
    getMyProfileShortName: (state: InitialStateType) => state.my?.login || '',
    getProfileEmail: (state: InitialStateType) => state.my?.email || '',
  },
});

const profileActions = profileSlice.actions;
const profileReducer = profileSlice.reducer;
const profileSelector = profileSlice.selectors;

export { profileSlice, profileActions, profileReducer, profileSelector };
