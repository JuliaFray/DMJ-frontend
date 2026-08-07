import { createSlice } from '@reduxjs/toolkit';

import { authApi } from '../../api';
import { SocketEvents } from '../../lib';
import { INotifications } from '../../types';

type InitialStateType = {
  initialized: boolean;
  globalError?: string;
  usersOnline: string[];
  notifications: INotifications[];
  newMsgCounter: number;
};

const initialState: InitialStateType = {
  initialized: false,
  usersOnline: [],
  notifications: [],
  newMsgCounter: 0,
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setInitialized: (state) => {
      state.initialized = true;
    },
    setUninitialized: (state) => {
      state.initialized = false;
    },
    setUsersOnline: (state, payload) => {
      state.usersOnline = payload.payload.payload;
    },
    addNotification: (state, payload) => {
      const data = state.notifications;
      data.push(payload.payload.payload);
      state.notifications = data;
    },
    removeNotification: (state) => {
      state.notifications = [];
    },
    addNewMsgCounter: (state) => {
      state.newMsgCounter += 1;
    },
    clearNewMsgCounter: (state) => {
      state.newMsgCounter = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchRejected, (state) => {
      state.initialized = false;
    });
  },
  selectors: {
    getAppUserOnline: (state: InitialStateType) => state.usersOnline,
    getAppAllNotifications: (state: InitialStateType) => state.notifications,
    getAppInfoNotifications: (state: InitialStateType) =>
      state.notifications.filter((it) => it.type !== SocketEvents.MSG_EVENT),
    getAppMsgNotifications: (state: InitialStateType) => state.newMsgCounter,
  },
});

const appActions = appSlice.actions;
const appReducer = appSlice.reducer;
const appSelector = appSlice.selectors;

export { appSlice, appActions, appReducer, appSelector };
