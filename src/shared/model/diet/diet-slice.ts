import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getDietsDataLength, getDietsIsFetching } from 'shared/model';

import { dietApi } from '../../api/diet-api';
import { TDietPlan } from '../../types';

type TInitial = {
  diets: TDietPlan[];
  totalCount: number;
  isFetching: boolean;
  diet: TDietPlan | null;
};

const initialState: TInitial = {
  diets: [],
  totalCount: 0,
  isFetching: false,
  diet: null,
};

const dietSlice = createSlice({
  name: 'dietSlice',
  initialState,
  reducers: {
    clearState: (state) => {
      state.diets = [];
    },
    updateDiet: (state, { payload }) => {
      state.diet = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(dietApi.endpoints.getAllDiet.matchPending, (state: TInitial) => {
        state.isFetching = true;
        state.diets = [];
        state.totalCount = 0;
      })
      .addMatcher(
        dietApi.endpoints.getAllDiet.matchFulfilled,
        (state: TInitial, action: PayloadAction<any, string, any>) => {
          state.isFetching = false;
          state.diets = action.payload.data;
          state.totalCount = action.payload.totalCount;
        },
      )
      .addMatcher(dietApi.endpoints.getAllDiet.matchRejected, (state: TInitial) => {
        state.isFetching = false;
        state.diets = [];
        state.totalCount = 0;
      })
      .addMatcher(dietApi.endpoints.getOneDiet.matchPending, (state: TInitial) => {
        state.isFetching = true;
        state.diet = null;
      })
      .addMatcher(
        dietApi.endpoints.getOneDiet.matchFulfilled,
        (state: TInitial, action: PayloadAction<any, string, any>) => {
          state.isFetching = false;
          state.diet = action.payload.data;
        },
      )
      .addMatcher(dietApi.endpoints.getOneDiet.matchRejected, (state: TInitial) => {
        state.isFetching = false;
        state.diet = null;
      });
  },
  selectors: {
    getDiet: (state: TInitial) => state.diet,
    getDiets: (state: TInitial) => state.diets,
    getDietsDataLength: (state: TInitial) => state.totalCount,
    getDietsIsFetching: (state: TInitial) => state.isFetching,
  },
});

const dietActions = dietSlice.actions;
const dietReducer = dietSlice.reducer;
const dietSelectors = dietSlice.selectors;

export { dietSlice, dietActions, dietReducer, dietSelectors };
