import { createSlice } from "@reduxjs/toolkit";

import { INotifications } from "shared";

type InitialStateType = {
  initialized: boolean;
  globalError?: string;
  usersOnline: string[];
  notifications: INotifications[];
  newMsgCounter: number;
};

let initialState: InitialStateType = {
  initialized: false,
  usersOnline: [],
  notifications: [],
  newMsgCounter: 0,
};

const appSlice = createSlice({
  name: "app",
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
    addNewMsgCounter: (state, payload) => {
      state.newMsgCounter += 1;
    },
    clearNewMsgCounter: (state) => {
      state.newMsgCounter = 0;
    },
  },
});

const appActions = appSlice.actions;
const appReducer = appSlice.reducer;

export { appSlice, appActions, appReducer };
