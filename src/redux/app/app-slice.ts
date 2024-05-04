import {createSlice} from '@reduxjs/toolkit';

type INotifications = {
    from: string,
    fromId: string,
    msg: string
}
export type InitialStateType = {
    initialized: boolean,
    globalError?: string,
    usersOnline: string[],
    notifications: INotifications[]
}

let initialState: InitialStateType = {
    initialized: false,
    usersOnline: [],
    notifications: []
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setInitialized: (state) => {
            state.initialized = true;
        },
        setUninitialized: (state) => {
            state.initialized = false;
        },
        addUserOnline: (state, payload) => {
            const data = state.usersOnline;
            if (typeof payload.payload.payload === 'string') {
                data.push(payload.payload.payload);
            } else {
                data.push(...payload.payload.payload);
            }
            state.usersOnline = data;
        },
        removeUserOnline: (state, payload) => {
            state.usersOnline = state.usersOnline.filter(id => id !== payload.payload.payload);
        },
        addNotification: (state, payload) => {
            const data = state.notifications;
            data.push(payload.payload.payload);
            state.notifications = data;
        },
        removeNotification: (state) => {
            state.notifications = [];
        },
    }
});

export default appSlice.reducer;
export const appActions = appSlice.actions;
