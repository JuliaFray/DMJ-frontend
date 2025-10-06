// eslint-disable-next-line import/no-unresolved
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/dist/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';

import { CountResponseType, GenericResponseType } from 'shared/api/api-types';
import { TDietPlan } from 'shared/types';

import customFetchBase from './custom-fetch-base';

const baseUrl = 'diet';

export const dietApi = createApi({
  reducerPath: 'dietApi',
  baseQuery: customFetchBase,
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    createDiet: build.mutation<string, any>({
      query: ({ searchParams }) => {
        return {
          url: `${baseUrl}/create`,
          method: 'POST',
          body: {},
        };
      },
    }),
    getAllDiet: build.query<CountResponseType<TDietPlan[]>, { searchParams?: string }>({
      query: ({ searchParams }) => {
        return {
          url: `${baseUrl}`,
          method: 'GET',
        };
      },
    }),
    getOneDiet: build.query<GenericResponseType<TDietPlan>, { id: string }>({
      query: ({ id }) => {
        return {
          url: `${baseUrl}/${id}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useLazyGetAllDietQuery, useGetOneDietQuery } = dietApi;
