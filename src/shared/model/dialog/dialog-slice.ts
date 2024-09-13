import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TDialog, TDialogFriends, TMessage} from 'entities/message';
import {getAllDialogs, getMessagesByDialogId, getUsersWithStatus} from './dialog-thunks';

type InitialStateType = {
    messages: Array<TMessage>,
    dialogs: Array<TDialog>,
    users: TDialogFriends[],
    selectedDialog: TDialog | null
};

let initialState: InitialStateType = {
    messages: [],
    dialogs: [],
    users: [],
    selectedDialog: null
};

const dialogSlice = createSlice({
    name: 'dialog',
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
        }
    },
    extraReducers: (builder) => {
        builder
            //=====getAllDialogs=====//
            .addCase(getAllDialogs.pending, (state) => {

            })
            .addCase(getAllDialogs.fulfilled, (state, action: PayloadAction<any>) => {
                state.dialogs = action.payload.data;
            })
            .addCase(getAllDialogs.rejected, (state) => {

            })
            //=====getMessagesByDialog=====//
            .addCase(getMessagesByDialogId.pending, (state) => {

            })
            .addCase(getMessagesByDialogId.fulfilled, (state, action: PayloadAction<any>) => {
                state.messages = action.payload.data;
            })
            .addCase(getMessagesByDialogId.rejected, (state) => {

            })
            //=====getUsersWithStatus=====//
            .addCase(getUsersWithStatus.pending, (state) => {

            })
            .addCase(getUsersWithStatus.fulfilled, (state, action: PayloadAction<any>) => {
                state.users = action.payload.data;
            })
            .addCase(getUsersWithStatus.rejected, (state) => {

            })


    }
})

const dialogActions = dialogSlice.actions;
const dialogReducer = dialogSlice.reducer;

export {dialogSlice, dialogActions, dialogReducer}
