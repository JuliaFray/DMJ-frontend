// eslint-disable-next-line import/no-unresolved
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/dist/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';

import { AddFoodType, IDietPlan, ProductItem } from '../types';

import { CountResponseType, GenericResponseType } from './api-types';
import customFetchBase from './custom-fetch-base';

const ONE_DIET = 'ONE_DIET';

export const dietApi = createApi({
  reducerPath: 'dietApi',
  baseQuery: customFetchBase('/diet'),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    createDietPlan: build.mutation<string, { body: IDietPlan }>({
      query: ({ body }) => {
        return {
          url: `/create`,
          method: 'POST',
          body,
        };
      },
    }),
    getAllDietPlans: build.query<CountResponseType<IDietPlan[]>, void>({
      query: () => {
        return {
          url: ``,
          method: 'GET',
        };
      },
    }),
    getOneDietPlan: build.query<GenericResponseType<IDietPlan>, { id: string }>({
      query: ({ id }) => {
        return {
          url: `/${id}`,
          method: 'GET',
        };
      },
      providesTags: [ONE_DIET],
    }),
    updateDietPlan: build.mutation<string, { id: string; body: IDietPlan }>({
      query: ({ id, body }) => {
        return {
          url: `/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: [ONE_DIET],
    }),
    addFoodToDietPlan: build.mutation<void, AddFoodType>({
      query: (data) => {
        return {
          url: `/add-food/${data.id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: [ONE_DIET],
    }),
    removeFoodFromDietPlan: build.mutation<
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
      invalidatesTags: [ONE_DIET],
    }),
    deleteDietPlan: build.mutation<void, { id: string }>({
      query: ({ id }) => {
        return {
          url: `/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useLazyGetAllDietPlansQuery,
  useGetOneDietPlanQuery,
  useUpdateDietPlanMutation,
  useAddFoodToDietPlanMutation,
  useRemoveFoodFromDietPlanMutation,
  useDeleteDietPlanMutation,
} = dietApi;
