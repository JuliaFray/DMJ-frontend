import {createSlice} from "@reduxjs/toolkit";

type TInitial = {
    display: boolean,
}

const initialState: TInitial = {
    display: false
}

const spinnerSlice = createSlice({
    name: 'spinner',
    initialState,
    reducers: {
        show: (state, payload) => {
            state.display = true;
        },
        hide: (state, payload) => {
            state.display = false;
        }
    }
})
const spinnerActions = spinnerSlice.actions;
const spinnerReducer = spinnerSlice.reducer;

export {spinnerSlice, spinnerActions, spinnerReducer}
