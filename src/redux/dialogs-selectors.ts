import {AppStateType} from "./redux-store";

export const getDialogs = (state: AppStateType) => {
    return state.dialogPage.dialogs
};

export const getMessages = (state: AppStateType) => {
    return state.dialogPage.messages
};
