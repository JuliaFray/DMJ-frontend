import { createSlice } from '@reduxjs/toolkit';

import { foodApi } from '../../api';

type TInitial = {
  display: any;
};

const initialState: TInitial = {
  display: {},
};

const foodSlice = createSlice({
  name: 'foodSlice',
  initialState,
  reducers: {
    clearState: (state) => {
      state.display = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // --------------- getFoodList ---------------- //
      .addMatcher(
        foodApi.endpoints.getFoodList.matchFulfilled,
        (state: TInitial, { payload }) => {},
      );
  },
});
const foodActions = foodSlice.actions;
const foodReducer = foodSlice.reducer;
const foodSelectors = foodSlice.selectors;

export { foodSlice, foodActions, foodReducer, foodSelectors };
