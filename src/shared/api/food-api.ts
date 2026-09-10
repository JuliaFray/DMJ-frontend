// eslint-disable-next-line import/no-unresolved
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/dist/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';

import { ProductItem } from '../types';

import { CountResponseType, GenericResponseType } from './api-types';
import customFetchBase from './custom-fetch-base';

const versionApi = 'v3';

export const foodApi = createApi({
  reducerPath: 'foodApi',
  baseQuery: customFetchBase(`/${versionApi}/food`),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getFoodList: build.query<CountResponseType<ProductItem[]>, { query: string; page?: number }>({
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
    getFoodById: build.query<GenericResponseType<ProductItem>, { id: string }>({
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
