import {IDialog, IDialogFriends, IMessage} from '../../types/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getAllDialogs, getMessagesByDialog, getUsersWithStatus} from './dialog-thunks';

type InitialStateType = {
    messages: Array<IMessage>,
    dialogs: Array<IDialog>,
    users: IDialogFriends[]
};

let initialState: InitialStateType = {
    messages: [],
    dialogs: [],
    users: []
};

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {},
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
            .addCase(getMessagesByDialog.pending, (state) => {

            })
            .addCase(getMessagesByDialog.fulfilled, (state, action: PayloadAction<any>) => {
                state.messages = action.payload.data;
            })
            .addCase(getMessagesByDialog.rejected, (state) => {

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


export default dialogSlice.reducer;
export const dialogActions = dialogSlice.actions;

