import { BaseQueryFn, createApi, EndpointBuilder } from '@reduxjs/toolkit/query/react';

import { IUser } from '../types';

import { CountResponseType } from './api-types';
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
    changeAvatar: build.mutation<void, { userId: string; avatarId: string }>({
      query: ({ userId, avatarId }) => {
        return {
          url: `/${userId}/change-avatar`,
          method: 'PUT',
          body: { avatarId },
        };
      },
    }),
  }),
});

export const { useLazyGetAllUsersQuery } = usersApi;
