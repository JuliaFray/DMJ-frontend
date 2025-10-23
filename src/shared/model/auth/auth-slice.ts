import { createSlice } from '@reduxjs/toolkit';

import { GenericResponseType } from 'shared/api/api-types';
import { appActions, profileActions } from 'shared/model';
import { TUser } from 'shared/types';

import { authApi } from '../../api';

type ValidationError = Record<string, any>;

type InitialStateType = {
  id: string | null;
  isAuth: boolean;
  isFetching?: boolean;
  errors: ValidationError;
  globalError: string | null;
  showSuccessSend: boolean;
};

const initialState: InitialStateType = {
  id: null,
  isAuth: false,
  isFetching: false,
  errors: {},
  globalError: null,
  showSuccessSend: false,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      state.isAuth = true;
      state.id = payload.id;
    },
    logout: (state) => {
      state.isAuth = false;
      state.id = null;
      window.localStorage.removeItem('token');
    },
    setErrors: (state, { payload }) => {
      if (payload instanceof Array) {
        payload.forEach((err: ValidationError) => {
          state.errors[err.field] = err.msg;
        });
      } else {
        state.errors = payload;
      }
    },
    setGlobalError: (state, { payload }) => {
      state.globalError = payload;
    },
    setShowSuccessSend: (state, { payload }) => {
      state.showSuccessSend = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //= ====login=====//
      .addMatcher(authApi.endpoints.login.matchPending, (state) => {
        state.isFetching = true;
        state.globalError = null;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.isFetching = false;
        if (payload) {
          state.isAuth = true;
          state.id = payload._id;
          state.globalError = null;
          state.errors = [];
          profileActions.setProfile(payload);
        }
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, { payload }) => {
        state.isFetching = false;
        state.globalError = (payload?.data as GenericResponseType<TUser>).message;
        state.isAuth = false;
        state.id = null;
        window.localStorage.removeItem('token');
        appActions.setUninitialized();
      })
      //= ===registerUser=====//
      .addMatcher(authApi.endpoints.register.matchPending, (state) => {
        state.isFetching = true;
        state.showSuccessSend = false;
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.showSuccessSend = true;
        if (payload) {
          state.isAuth = true;
          state.id = payload._id;
          state.globalError = null;
          state.errors = [];
        }
      })
      .addMatcher(authApi.endpoints.register.matchRejected, (state) => {
        state.isFetching = false;
        state.showSuccessSend = false;
      })
      //= ====confirmEmail=====//
      .addMatcher(authApi.endpoints.confirm.matchPending, (state) => {
        state.isFetching = true;
      })
      .addMatcher(authApi.endpoints.confirm.matchFulfilled, (state) => {
        state.isFetching = false;
      })
      .addMatcher(authApi.endpoints.confirm.matchRejected, (state) => {
        state.isFetching = false;
      });
  },
  selectors: {
    getIsAuth: (state: InitialStateType) => state.isAuth,
    getIsFetching: (state: InitialStateType) => state.isFetching,
    getAuthId: (state: InitialStateType) => state.id,
    getAuthErrors: (state: InitialStateType) => state.errors,
    getAuthGlobalError: (state: InitialStateType) => state.globalError,
    getSuccessSend: (state: InitialStateType) => state.showSuccessSend,
  },
});

const authActions = authSlice.actions;
const authReducer = authSlice.reducer;
const authSelector = authSlice.selectors;

export { authSlice, authActions, authReducer, authSelector };
