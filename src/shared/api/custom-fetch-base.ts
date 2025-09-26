import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

import { pathKeys } from 'shared/lib';

import { appActions, authActions, profileActions, RootState } from '../model';

import { BASE_URL } from './api';

const baseUrl = BASE_URL;

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}`,
  prepareHeaders: async (headers) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Access-Control-Allow-Origin', `*`);
    return headers;
  },
});

const customFetchBase: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const isAuth = (api.getState() as RootState)?.auth?.isAuth;

  await mutex.waitForUnlock();
  let result;

  if (localStorage.getItem('token') && !isAuth) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult: any = await baseQuery({ url: '/auth/status' }, api, extraOptions);

        if (refreshResult.data) {
          api.dispatch(appActions.setInitialized());
          api.dispatch(profileActions.setProfile(refreshResult.data.data));
          api.dispatch(authActions.setAuth(refreshResult.data.data));
          window.localStorage.setItem('token', refreshResult.data.token);

          result = await baseQuery(args, api, extraOptions);
        } else {
          // if ((result.error?.data as any)?.code === 404) {
          //   window.location.href = "/404";
          // }
          api.dispatch(authActions.logout());
          api.dispatch(appActions.setUninitialized());
          window.location.href = pathKeys.root;
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  } else {
    result = await baseQuery(args, api, extraOptions);
    if ((result.error?.data as any)?.message === 'Нет доступа') {
      api.dispatch(authActions.logout());
      api.dispatch(appActions.setUninitialized());
      window.location.href = pathKeys.root;
    }
  }

  return result;
};

export default customFetchBase;
