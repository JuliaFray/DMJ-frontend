// eslint-disable-next-line import/no-unresolved
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/dist/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';

import { AddFoodType, IDietPlan } from '../types';

import { CountResponseType } from './api-types';
import customFetchBase from './custom-fetch-base';

const baseUrl = 'diary';

export const diaryApi = createApi({
  reducerPath: 'diaryApi',
  baseQuery: customFetchBase(baseUrl),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getDiaryByDay: build.query<CountResponseType<IDietPlan[]>, { date: string }>({
      query: ({ date }) => {
        const searchParams = new URLSearchParams();
        searchParams.append('date', date);

        return {
          url: ``,
          method: 'GET',
          params: searchParams,
        };
      },
    }),
    addDiaryRecord: build.mutation<void, AddFoodType>({
      query: ({ id, foods }) => {
        return {
          url: `/add-food/${id}`,
          method: 'PUT',
          body: foods,
        };
      },
    }),
    removeDiaryRecord: build.mutation<
      void,
      {
        id: string;
        foodId: string;
        day: number;
      }
    >({
      query: ({ id, foodId, day }) => {
        return {
          url: `/remove-food/${id}`,
          method: 'PUT',
          body: { foodId, day },
        };
      },
    }),
  }),
});

export const {
  useLazyGetDiaryByDayQuery,
  useAddDiaryRecordMutation,
  useRemoveDiaryRecordMutation,
} = diaryApi;
