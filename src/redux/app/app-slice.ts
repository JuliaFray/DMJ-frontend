import {createSlice} from '@reduxjs/toolkit';

export type InitialStateType = {
    initialized: boolean,
    globalError?: string,
    usersOnline: string[]
}

let initialState: InitialStateType = {
    initialized: false,
    usersOnline: []
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
                console.log(payload.payload.payload);
                data.push(payload.payload.payload);
            } else {
                console.log(payload.payload.payload);
                data.push(...payload.payload.payload);
            }
            state.usersOnline = data;
        },
        removeUserOnline: (state, payload) => {
            console.log(payload.payload.payload);
            state.usersOnline = state.usersOnline.filter(id => id !== payload.payload.payload);
        }
    }
});

export default appSlice.reducer;
export const appActions = appSlice.actions;
