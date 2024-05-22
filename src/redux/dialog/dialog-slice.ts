import {IDialog, IDialogFriends, IMessage} from '../../types/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getAllDialogs, getMessagesByDialogId, getUsersWithStatus} from './dialog-thunks';

type InitialStateType = {
    messages: Array<IMessage>,
    dialogs: Array<IDialog>,
    users: IDialogFriends[],
    selectedDialog: IDialog | null
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
        addSelectedDialog:  (state, payload) => {
            state.selectedDialog = payload.payload;
        },
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


export default dialogSlice.reducer;
export const dialogActions = dialogSlice.actions;

