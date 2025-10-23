// eslint-disable-next-line import/no-unresolved
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/dist/query/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from 'shared/api/api';
import { GenericResponseType, ResultCodes } from 'shared/api/api-types';
import { profileActions } from 'shared/model';
import { ILoginData, TUser } from 'shared/types';
import { RegisterDataType } from 'shared/types/profile.type';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
    prepareHeaders: async (headers) => {
      return headers;
    },
    validateStatus: (response: Response, body: GenericResponseType<unknown>) => {
      if (body.resultCode === ResultCodes.Error) {
        window.localStorage.removeItem('token');
      } else if ('token' in body) {
        window?.localStorage?.setItem('token', body.token);
      }
      return body.resultCode === ResultCodes.Success;
    },
  }),
  endpoints: (build) => ({
    login: build.mutation<TUser, { data: ILoginData }>({
      query: ({ data }) => {
        return {
          url: `/login`,
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (response: GenericResponseType<TUser>): TUser => {
        return response.data;
      },
    }),
    register: build.mutation<TUser, { data: RegisterDataType }>({
      query: ({ data }) => {
        return {
          url: `/register`,
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (response: GenericResponseType<TUser>): TUser => {
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
