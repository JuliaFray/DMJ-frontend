import { createApi } from '@reduxjs/toolkit/query/react';

import { ILoginData, IUser, RegisterDataType } from '../types';

import { GenericResponseType, ResultCodes } from './api-types';
import customFetchBase from './custom-fetch-base';

const validateStatus = (response: Response, body: GenericResponseType<unknown>) => {
  if (response.status === ResultCodes.UndefinedError) {
    window.localStorage.removeItem('token');
  } else if ('token' in body) {
    window?.localStorage?.setItem('token', body.token);
  }
  return response.status === ResultCodes.Success;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBase(`/auth`, validateStatus),
  endpoints: (build) => ({
    login: build.mutation<IUser, { data: ILoginData }>({
      query: ({ data }) => {
        return {
          url: `/login`,
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (response: GenericResponseType<IUser>): IUser => {
        return response.data;
      },
    }),
    register: build.mutation<IUser, { data: RegisterDataType }>({
      query: ({ data }) => {
        return {
          url: `/register`,
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (response: GenericResponseType<IUser>): IUser => {
        return response.data;
      },
    }),
    confirm: build.query<GenericResponseType<void>, { email: string; token: string }>({
      query: ({ email, token }) => {
        return {
          url: `/confirmation/${email}/${token}`,
          method: 'GET',
        };
      },
    }),
    logout: build.mutation<GenericResponseType<void>, void>({
      query: () => {
        return {
          url: `/login`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLazyConfirmQuery } = authApi;
