import { createSlice } from '@reduxjs/toolkit';

type TInitial = {
  display: boolean;
};

const initialState: TInitial = {
  display: false,
};

const spinnerSlice = createSlice({
  name: 'spinnerSlice',
  initialState,
  reducers: {
    show: (state) => {
      state.display = true;
    },
    hide: (state) => {
      state.display = false;
    },
  },
  selectors: {
    getSpinnerDisplay: (state: TInitial) => state.display,
  },
});
const spinnerActions = spinnerSlice.actions;
const spinnerReducer = spinnerSlice.reducer;
const spinnerSelector = spinnerSlice.selectors;

export { spinnerSlice, spinnerActions, spinnerReducer, spinnerSelector };
