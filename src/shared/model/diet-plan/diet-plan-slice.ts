import { createSlice } from '@reduxjs/toolkit';

import { dietApi } from '../../api/diet-api';
import { IDietPlan } from '../../types';
import { Nullable } from '../../types/general.type';

type TInitial = {
  dietPlans: IDietPlan[];
  totalCount: number;
  isFetching: boolean;
  dietPlan: Nullable<IDietPlan>;
};

const initialState: TInitial = {
  dietPlans: [],
  totalCount: 0,
  isFetching: false,
  dietPlan: null,
};

const dietPlanSlice = createSlice({
  name: 'dietPlanSlice',
  initialState,
  reducers: {
    clearState: (state: TInitial) => {
      state.dietPlans = [];
    },
    updateDietPlan: (state: TInitial, { payload }) => {
      state.dietPlan = payload;
    },
    setDayRating: (state: TInitial, { payload }) => {
      const currentDayPlan = state.dietPlan?.planByDay.find(({ day }) => day === payload.day);

      if (currentDayPlan) {
        currentDayPlan.rating = payload.rating;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(dietApi.endpoints.getAllDiet.matchPending, (state: TInitial) => {
        state.isFetching = true;
        state.dietPlans = [];
        state.totalCount = 0;
      })
      .addMatcher(dietApi.endpoints.getAllDiet.matchFulfilled, (state: TInitial, { payload }) => {
        state.isFetching = false;
        state.dietPlans = payload.data;
        state.totalCount = payload.totalCount;
      })
      .addMatcher(dietApi.endpoints.getAllDiet.matchRejected, (state: TInitial) => {
        state.isFetching = false;
        state.dietPlans = [];
        state.totalCount = 0;
      })
      .addMatcher(dietApi.endpoints.getOneDiet.matchPending, (state: TInitial) => {
        state.isFetching = true;
        state.dietPlan = null;
      })
      .addMatcher(dietApi.endpoints.getOneDiet.matchFulfilled, (state: TInitial, { payload }) => {
        state.isFetching = false;
        state.dietPlan = payload.data;
      })
      .addMatcher(dietApi.endpoints.getOneDiet.matchRejected, (state: TInitial) => {
        state.isFetching = false;
        state.dietPlan = null;
      });
  },
  selectors: {
    getDiet: (state: TInitial) => state.dietPlan,
    getDiets: (state: TInitial) => state.dietPlans,
    getDietsDataLength: (state: TInitial) => state.totalCount,
    getDietsIsFetching: (state: TInitial) => state.isFetching,
    getDietPlanByDay: (state: TInitial) => state.dietPlan?.planByDay,
    getDietDayRating: (state: TInitial) => (currentDay: number) =>
      state.dietPlan?.planByDay.find(({ day }) => day === currentDay)?.rating,
  },
});

const dietActions = dietPlanSlice.actions;
const dietReducer = dietPlanSlice.reducer;
const dietSelector = dietPlanSlice.selectors;

export { dietPlanSlice, dietActions, dietReducer, dietSelector };
