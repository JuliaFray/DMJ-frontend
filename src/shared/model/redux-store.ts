import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { foodSlice } from 'shared/model/usda/foodSlice';

import { articleApi, dietApi, foodApi, usersApi } from '../api';

import { appSlice } from './apps';
import { authSlice } from './auth';
import { dialogSlice } from './dialog';
import { dietSlice } from './diet';
import { postsSlice } from './posts';
import { profileSlice } from './profile';
import { spinnerSlice } from './spinner';
import { usersSlice } from './users';
import { wsReducer } from './ws';

const rootReducer = combineReducers({
  app: appSlice.reducer,
  auth: authSlice.reducer,
  profile: profileSlice.reducer,
  posts: postsSlice.reducer,
  user: usersSlice.reducer,
  dialog: dialogSlice.reducer,
  spinner: spinnerSlice.reducer,
  [foodSlice.reducerPath]: foodSlice.reducer,
  [dietSlice.reducerPath]: dietSlice.reducer,
  ws: wsReducer.wsReducer,
  [foodApi.reducerPath]: foodApi.reducer,
  [articleApi.reducerPath]: articleApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [dietApi.reducerPath]: dietApi.reducer,
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
      .concat(dietApi.middleware),
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
