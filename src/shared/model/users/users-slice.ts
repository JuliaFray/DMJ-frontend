import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { usersApi } from '../../api';
import { TUser } from '../../types';

export type TInitial = {
  users: TUser[];
  totalCount: number;
  isFetching: boolean;
  userId: string | null;
};

const initialState: TInitial = {
  isFetching: false,
  users: [],
  totalCount: 0,
  userId: null,
};

const usersSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(usersApi.endpoints.getAllUsers.matchPending, (state: TInitial) => {
        state.isFetching = true;
      })
      .addMatcher(usersApi.endpoints.getAllUsers.matchFulfilled, (state: TInitial, { payload }) => {
        state.users = payload.data;
        state.totalCount = payload.totalCount;
        state.isFetching = false;
      })
      .addMatcher(usersApi.endpoints.getAllUsers.matchRejected, (state: TInitial) => {
        state.isFetching = false;
        state.users = [];
        state.totalCount = 0;
      });
  },
  selectors: {
    getUsers: (state: TInitial) => state.users,
    getTotalCount: (state: TInitial) => state.totalCount,
    getIsFetching: (state: TInitial) => state.isFetching,
  },
});

const usersActions = usersSlice.actions;
const usersReducer = usersSlice.reducer;
const usersSelector = usersSlice.selectors;

export { usersSlice, usersActions, usersReducer, usersSelector };
