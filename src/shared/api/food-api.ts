// eslint-disable-next-line import/no-unresolved
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/dist/query/react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { FoodItem, FoodList } from '../types';

import { BASE_URL } from './api';
import { GenericResponseType } from './api-types';

export const foodApi = createApi({
  reducerPath: 'foodApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/food`,
    prepareHeaders: async (headers) => {
      return headers;
    },
  }),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getFoodList: build.query<GenericResponseType<FoodList>, { query: string; page?: number }>({
      query: ({ query, page }) => {
        const searchParams = new URLSearchParams();
        searchParams.append('search_expression', query);
        if (page) {
          searchParams.append('page', page.toString());
        }

        return {
          url: 'list',
          method: 'GET',
          params: searchParams,
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
