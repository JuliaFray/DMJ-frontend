// eslint-disable-next-line import/no-unresolved
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/dist/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';

import customFetchBase from './custom-fetch-base';

const baseUrl = 'diet';

export const dietApi = createApi({
  reducerPath: 'dietApi',
  baseQuery: customFetchBase,
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    createDiet: build.mutation<any, any>({
      query: ({ searchParams }) => {
        return {
          url: `${baseUrl}/create`,
          method: 'POST',
          body: {},
        };
      },
    }),
    getAllDiet: build.query<any, any>({
      query: ({ searchParams }) => {
        return {
          url: `${baseUrl}`,
          method: 'GET',
        };
      },
    }),
    getOneDiet: build.query<any, any>({
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
