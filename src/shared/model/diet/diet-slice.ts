import { createSlice } from '@reduxjs/toolkit';

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
    clearState: (state: TInitial) => {
      state.diets = [];
    },
    updateDiet: (state: TInitial, { payload }) => {
      state.diet = payload;
    },
    setDietDayRating: (state: TInitial, { payload }) => {
      if (state.diet && state.diet.period && payload.day <= state.diet.period) {
        if (!Object.hasOwn(state.diet.stat, 'dayRating')) {
          state.diet.stat.dayRating = [];
        }
        const exists = state.diet.stat.dayRating?.find(
          (dayRating) => dayRating.day === payload.day,
        );
        if (exists) {
          exists.rating = payload.rating;
        } else {
          state.diet?.stat.dayRating?.push(payload);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(dietApi.endpoints.getAllDiet.matchPending, (state: TInitial) => {
        state.isFetching = true;
        state.diets = [];
        state.totalCount = 0;
      })
      .addMatcher(dietApi.endpoints.getAllDiet.matchFulfilled, (state: TInitial, { payload }) => {
        state.isFetching = false;
        state.diets = payload.data;
        state.totalCount = payload.totalCount;
      })
      .addMatcher(dietApi.endpoints.getAllDiet.matchRejected, (state: TInitial) => {
        state.isFetching = false;
        state.diets = [];
        state.totalCount = 0;
      })
      .addMatcher(dietApi.endpoints.getOneDiet.matchPending, (state: TInitial) => {
        state.isFetching = true;
        state.diet = null;
      })
      .addMatcher(dietApi.endpoints.getOneDiet.matchFulfilled, (state: TInitial, { payload }) => {
        state.isFetching = false;
        state.diet = payload.data;
      })
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
    getDietDayRating: (state: TInitial) => state.diet?.stat.dayRating,
  },
});

const dietActions = dietSlice.actions;
const dietReducer = dietSlice.reducer;
const dietSelector = dietSlice.selectors;

export { dietSlice, dietActions, dietReducer, dietSelector };
