import { BaseQueryFn, createApi, EndpointBuilder } from '@reduxjs/toolkit/query/react';

import { IUser, IUserStats, IUserWithTargets, TProfileStats } from '../types';

import { CountResponseType, GenericResponseType } from './api-types';
import customFetchBase from './custom-fetch-base';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: customFetchBase('/users'),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getAllUsers: build.query<
      CountResponseType<IUser[]>,
      { currentPage: number; isFollowers: boolean; userId: string }
    >({
      query: ({ currentPage, isFollowers, userId }) => {
        const searchParams = new URLSearchParams();
        searchParams.append('currentPage', currentPage.toString());
        if (isFollowers) {
          searchParams.append('isFollowers', `${isFollowers}`);
        }
        if (userId) {
          searchParams.append('userId', userId);
        }

        return {
          url: `?${searchParams.size ? searchParams.toString() : ''}`,
          method: 'GET',
        };
      },
    }),
    getUserById: build.query<GenericResponseType<IUser>, { userId: string }>({
      query: ({ userId }) => {
        return {
          url: `/${userId}`,
          method: 'GET',
        };
      },
      providesTags: (result, error, arg) => [{ type: 'getUserById', id: arg.userId }],
    }),
    getUserStatsById: build.query<TProfileStats & IUserStats, { userId: string }>({
      query: ({ userId }) => {
        return {
          url: `/${userId}/stats`,
          method: 'GET',
        };
      },
      providesTags: (result, error, arg) => [{ type: 'getUserStatsById', id: arg.userId }],
      transformResponse: (
        response: GenericResponseType<TProfileStats & IUserStats>,
      ): TProfileStats & IUserStats => {
        return response.data;
      },
    }),
    changeAvatar: build.mutation<void, { userId: string; avatarId: string }>({
      query: ({ userId, avatarId }) => {
        return {
          url: `/${userId}/change-avatar`,
          method: 'PUT',
          body: { avatarId },
        };
      },
    }),
    changeProfile: build.mutation<void, { user: Partial<IUserWithTargets> }>({
      query: ({ user }) => {
        return {
          url: `/${user._id}/change-profile`,
          method: 'PUT',
          body: { user },
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'getUserById', id: arg.user._id }],
    }),
  }),
});

export const {
  useLazyGetAllUsersQuery,
  useChangeAvatarMutation,
  useGetUserByIdQuery,
  useGetUserStatsByIdQuery,
  useChangeProfileMutation,
} = usersApi;
