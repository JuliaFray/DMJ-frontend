import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { dietApi } from '../../api/diet-api';
import { TDietPlan } from '../../types';

type TInitial = {
  diets: TDietPlan[];
  totalCount: number;
  isFetching: boolean;
};

const mock = [
  {
    _id: '1',
    name: 'test',
    period: 1,
    author: {
      _id: '11',
      firstName: 'firstName',
      secondName: 'secondName',
    },
    meals: [1, 2, 3],
    stats: {
      plan: {
        cal: 111,
        proteins: 11,
        fats: 11,
        carb: 11,
      },
      fact: {
        cal: 111,
        proteins: 11,
        fats: 11,
        carb: 11,
      },
      rating: 5,
    },
  },
];

const initialState: TInitial = {
  diets: [],
  totalCount: 0,
  isFetching: false,
};

const dietSlice = createSlice({
  name: 'diet',
  initialState,
  reducers: {
    clearState: (state) => {
      state.diets = [];
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
        state.diets = mock;
        state.totalCount = 0;
      });
  },
});

const dietActions = dietSlice.actions;
const dietReducer = dietSlice.reducer;

export { dietSlice, dietActions, dietReducer };
