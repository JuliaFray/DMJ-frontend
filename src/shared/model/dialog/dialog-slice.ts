import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TDialog, TDialogFriends, TMessage } from '../../types';

import { getAllDialogs, getMessagesByDialogId, getUsersWithStatus } from './dialog-thunks';

type InitialStateType = {
  messages: Array<TMessage>;
  dialogs: Array<TDialog>;
  users: TDialogFriends[];
  selectedDialog: TDialog | null;
};

const initialState: InitialStateType = {
  messages: [],
  dialogs: [],
  users: [],
  selectedDialog: null,
};

const dialogSlice = createSlice({
  name: 'dialogSlice',
  initialState,
  reducers: {
    addMsg: (state, payload) => {
      state.messages.push(payload.payload);
    },
    addSelectedDialog: (state, payload) => {
      state.selectedDialog = payload.payload;
    },
    clearState: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //= ====getAllDialogs=====//
      .addCase(getAllDialogs.pending, () => {})
      .addCase(getAllDialogs.fulfilled, (state, action: PayloadAction<any>) => {
        state.dialogs = action.payload.data;
      })
      .addCase(getAllDialogs.rejected, () => {})
      //= ====getMessagesByDialog=====//
      .addCase(getMessagesByDialogId.pending, () => {})
      .addCase(getMessagesByDialogId.fulfilled, (state, action: PayloadAction<any>) => {
        state.messages = action.payload.data;
      })
      .addCase(getMessagesByDialogId.rejected, () => {})
      //= ====getUsersWithStatus=====//
      .addCase(getUsersWithStatus.pending, () => {})
      .addCase(getUsersWithStatus.fulfilled, (state, action: PayloadAction<any>) => {
        state.users = action.payload.data;
      })
      .addCase(getUsersWithStatus.rejected, () => {});
  },
  selectors: {
    getDialogs: (state: InitialStateType) => state.dialogs,
    getMessages: (state: InitialStateType) => state.messages,
    getDialogUsers: (state: InitialStateType) => state.users,
    getSelectedDialog: (state: InitialStateType) => state.selectedDialog,
  },
});

const dialogActions = dialogSlice.actions;
const dialogReducer = dialogSlice.reducer;
const dialogSelector = dialogSlice.selectors;

export { dialogSlice, dialogActions, dialogReducer, dialogSelector };
