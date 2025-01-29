import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dietApi } from "shared/api/diet-api";

import { TDietPlan } from "shared";

type TInitial = {
  diets: TDietPlan[];
  totalCount: number;
  isFetching: boolean;
};

const initialState: TInitial = {
  diets: [],
  totalCount: 0,
  isFetching: false,
};

const dietSlice = createSlice({
  name: "diet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        dietApi.endpoints.getAllDiet.matchPending,
        (state: TInitial) => {
          state.isFetching = true;
          state.diets = [];
          state.totalCount = 0;
        }
      )
      .addMatcher(
        dietApi.endpoints.getAllDiet.matchFulfilled,
        (state: TInitial, action: PayloadAction<any, string, any>) => {
          state.isFetching = false;
          state.diets = action.payload.data;
          state.totalCount = action.payload.totalCount;
        }
      )
      .addMatcher(
        dietApi.endpoints.getAllDiet.matchRejected,
        (state: TInitial) => {
          state.isFetching = false;
          state.diets = [];
          state.totalCount = 0;
        }
      );
  },
});

const dietActions = dietSlice.actions;
const dietReducer = dietSlice.reducer;

export { dietSlice, dietActions, dietReducer };
