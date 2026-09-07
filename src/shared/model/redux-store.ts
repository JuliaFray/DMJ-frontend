import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { articleApi, authApi, diaryApi, dietApi, foodApi, usersApi } from '../api';

import { appSlice } from './apps';
import { authSlice } from './auth';
import { dialogSlice } from './dialog';
import { dietPlanSlice } from './diet-plan';
import { foodSlice } from './food';
import { postsSlice } from './posts';
import { profileSlice } from './profile';
import { spinnerSlice } from './spinner';
import { usersSlice } from './users';
import { wsReducer } from './ws';

const rootReducer = combineReducers({
  [appSlice.reducerPath]: appSlice.reducer,
  [authSlice.reducerPath]: authSlice.reducer,
  [profileSlice.reducerPath]: profileSlice.reducer,
  [postsSlice.reducerPath]: postsSlice.reducer,
  [usersSlice.reducerPath]: usersSlice.reducer,
  [dialogSlice.reducerPath]: dialogSlice.reducer,
  [spinnerSlice.reducerPath]: spinnerSlice.reducer,
  [foodSlice.reducerPath]: foodSlice.reducer,
  [dietPlanSlice.reducerPath]: dietPlanSlice.reducer,
  ws: wsReducer.wsReducer,
  [foodApi.reducerPath]: foodApi.reducer,
  [articleApi.reducerPath]: articleApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [dietApi.reducerPath]: dietApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [diaryApi.reducerPath]: diaryApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {},
      },
    })
      .concat(foodApi.middleware)
      .concat(articleApi.middleware)
      .concat(usersApi.middleware)
      .concat(dietApi.middleware)
      .concat(authApi.middleware)
      .concat(diaryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type InferActionType<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;
export type GenericThunkType<A extends Action, P = Promise<void>> = ThunkAction<
  P,
  RootState,
  unknown,
  A
>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, unknown, null, Action<string>>;
