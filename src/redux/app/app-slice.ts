import {createSlice} from '@reduxjs/toolkit';
import {INotifications} from '../../types/types';

type InitialStateType = {
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
                if (!data.includes(payload.payload.payload)) {
                    data.push(payload.payload.payload);
                }
            } else if (Array.isArray(payload.payload.payload)) {
                data.push(...payload.payload.payload);
            } else {
                data.push(payload.payload.payload._id);
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
