// eslint-disable-next-line import/no-unresolved
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/dist/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';

import { AddFoodType, TDietPlan } from '../types';

import { CountResponseType, GenericResponseType } from './api-types';
import customFetchBase from './custom-fetch-base';

const baseUrl = 'diary';

export const diaryApi = createApi({
  reducerPath: 'diaryApi',
  baseQuery: customFetchBase,
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getDiaryByDay: build.query<CountResponseType<TDietPlan[]>, { date: string }>({
      query: ({ date }) => {
        const searchParams = new URLSearchParams();
        searchParams.append('date', date);

        return {
          url: `${baseUrl}`,
          method: 'GET',
          params: searchParams,
        };
      },
    }),
    addFood: build.mutation<void, AddFoodType>({
      query: ({ id, foods }) => {
        return {
          url: `${baseUrl}/add-food/${id}`,
          method: 'PUT',
          body: foods,
        };
      },
    }),
    removeFood: build.mutation<
      void,
      {
        id: string;
        foodId: string;
        day: number;
      }
    >({
      query: ({ id, foodId, day }) => {
        return {
          url: `${baseUrl}/remove-food/${id}`,
          method: 'PUT',
          body: { foodId, day },
        };
      },
    }),
  }),
});

export const { useLazyGetDiaryByDayQuery, useAddFoodMutation, useRemoveFoodMutation } = diaryApi;
