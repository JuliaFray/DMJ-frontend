import {RootState} from "../redux-store";

export const getUserOnline = (state: RootState) => {
    return state.app.usersOnline
};

export const getNotifications = (state: RootState) => {
    return state.app.notifications
};
