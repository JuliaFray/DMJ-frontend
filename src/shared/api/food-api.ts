// eslint-disable-next-line import/no-unresolved
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/dist/query/react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { GenericResponseType } from 'shared/api/api-types';
import { FoodItem, FoodList } from 'shared/types';

import { BASE_URL } from './api';

export const foodApi = createApi({
  reducerPath: 'foodApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/food`,
    prepareHeaders: async (headers) => {
      return headers;
    },
  }),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getFoodList: build.query<GenericResponseType<FoodList>, { query: string }>({
      query: ({ query }) => {
        const searchParams = new URLSearchParams();
        searchParams.append('search_expression', query);

        return {
          url: 'list',
          method: 'GET',
          params: {
            search_expression: query,
          },
        };
      },
    }),
    getFoodById: build.query<GenericResponseType<FoodItem>, { id: string }>({
      query: ({ id }) => {
        return {
          url: `${id}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useLazyGetFoodListQuery, useLazyGetFoodByIdQuery, middleware } = foodApi;
