// eslint-disable-next-line import/no-unresolved
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/dist/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';

import { AddFoodType, TDietPlan } from '../types';

import { CountResponseType, GenericResponseType } from './api-types';
import customFetchBase from './custom-fetch-base';

const baseUrl = 'diet';
const ONE_DIET = 'ONE_DIET';

export const dietApi = createApi({
  reducerPath: 'dietApi',
  baseQuery: customFetchBase,
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    createDiet: build.mutation<string, { body: TDietPlan }>({
      query: ({ body }) => {
        return {
          url: `${baseUrl}/create`,
          method: 'POST',
          body,
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
      providesTags: [ONE_DIET],
    }),
    updateDiet: build.mutation<string, { id: string; body: TDietPlan }>({
      query: ({ id, body }) => {
        return {
          url: `${baseUrl}/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: [ONE_DIET],
    }),
    addFood: build.mutation<void, AddFoodType>({
      query: ({ id, foods }) => {
        return {
          url: `${baseUrl}/add-food/${id}`,
          method: 'PUT',
          body: foods,
        };
      },
      invalidatesTags: [ONE_DIET],
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
      invalidatesTags: [ONE_DIET],
    }),
    deleteDiet: build.mutation<void, { id: string }>({
      query: ({ id }) => {
        return {
          url: `${baseUrl}/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useLazyGetAllDietQuery,
  useGetOneDietQuery,
  useUpdateDietMutation,
  useAddFoodMutation,
  useRemoveFoodMutation,
  useDeleteDietMutation,
} = dietApi;
