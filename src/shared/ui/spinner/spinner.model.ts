import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../../redux/redux-store";

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

export default spinnerSlice.reducer;
export const spinnerActions = spinnerSlice.actions;

export const getSpinnerState = (state: RootState) => {
    return state.spinner.display;
}
