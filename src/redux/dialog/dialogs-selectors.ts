import {RootState} from "../redux-store";

export const getDialogs = (state: RootState) => {
    return state.dialog.dialogs
};

export const getMessages = (state: RootState) => {
    return state.dialog.messages
};

export const getUsers = (state: RootState) => {
    return state.dialog.users
};
