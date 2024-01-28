import {createSlice} from '@reduxjs/toolkit';
import app from '../../App';

export type InitialStateType = {
    initialized: boolean,
    globalError?: string
}

let initialState: InitialStateType = {
    initialized: false
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
        }
    }
});

export default appSlice.reducer;
export const appActions = appSlice.actions;
