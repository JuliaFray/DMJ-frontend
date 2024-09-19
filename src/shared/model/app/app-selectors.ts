import {SocketEvents} from "shared/lib/DictConstants";
import {RootState} from "./../redux-store";

export const getUserOnline = (state: RootState) => {
    return state.app.usersOnline
};

export const getAllNotifications = (state: RootState) => {
    return state.app.notifications
};

export const getInfoNotifications = (state: RootState) => {
    return state.app.notifications.filter(it => it.type !== SocketEvents.MSG_EVENT);
};

export const getMsgNotifications = (state: RootState) => {
    return state.app.notifications.filter(it => it.type === SocketEvents.MSG_EVENT);
};
