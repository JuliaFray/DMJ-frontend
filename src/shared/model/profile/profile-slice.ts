import { createSlice } from '@reduxjs/toolkit';

import { authApi } from '../../api';
import { IUser, TProfileStats } from '../../types';

import {
  createFriendProfile,
  saveUserProfile,
  toggleFollowProfile,
  toggleFriendProfile,
} from './profile-thunks';

type InitialStateType = {
  profile: IUser | null;
  isFetching?: boolean;
  stats: TProfileStats | null;
  me: IUser | null;
};

const initialState: InitialStateType = {
  profile: null,
  isFetching: false,
  stats: null,
  me: null,
};

const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    setProfile: (state: InitialStateType, action) => {
      state.me = action.payload;
    },
    changeAvatar: (state: InitialStateType, action) => {
      if (state.me) {
        state.me.avatarId = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
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
        state.me = null;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        if (payload) {
          state.me = payload;
        }
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
        state.me = null;
      });
  },
  selectors: {
    getProfile: (state: InitialStateType) => state.profile,
    getMyProfile: (state: InitialStateType) => state.me,
    getMyProfileAvatar: (state: InitialStateType) => state.me?.avatar,
    getMyProfileFullName: (state: InitialStateType) => state.me?.login || '',
    getMyProfileShortName: (state: InitialStateType) => state.me?.login || '',
    getProfileEmail: (state: InitialStateType) => state.me?.email || '',
  },
});

const profileActions = profileSlice.actions;
const profileReducer = profileSlice.reducer;
const profileSelector = profileSlice.selectors;

export { profileSlice, profileActions, profileReducer, profileSelector };
