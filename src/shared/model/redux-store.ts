import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  articleApi,
  dialogSlice,
  dietApi,
  postsSlice,
  profileSlice,
  usdaApi,
  usersApi,
  usersSlice,
} from "shared";

import { appSlice } from "./app";
import { authSlice } from "./auth";
import { dietSlice } from "./diet";
import { spinnerSlice } from "./spinner";
import { wsReducer } from "./ws";

const rootReducer = combineReducers({
  app: appSlice.reducer,
  auth: authSlice.reducer,
  profile: profileSlice.reducer,
  posts: postsSlice.reducer,
  user: usersSlice.reducer,
  dialog: dialogSlice.reducer,
  spinner: spinnerSlice.spinnerReducer,
  diets: dietSlice.dietReducer,
  ws: wsReducer.wsReducer,
  [usdaApi.reducerPath]: usdaApi.reducer,
  [articleApi.reducerPath]: articleApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [dietApi.reducerPath]: dietApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {},
      },
    })
      .concat(usdaApi.middleware)
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
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  {},
  null,
  Action<string>
>;

export default store;
