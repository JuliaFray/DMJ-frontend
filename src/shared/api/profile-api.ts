import { BaseQueryFn, createApi, EndpointBuilder } from '@reduxjs/toolkit/query/react';

import customFetchBase from 'shared/api/custom-fetch-base';
import { usersApi } from 'shared/api/users-api';

import { IUser, TProfileStats } from '../types';

import { instance } from './api';
import { GenericResponseType } from './api-types';

const baseUrl = 'profile';
export const profileAPI = {
  getProfile(userId: string) {
    return instance.get<GenericResponseType<IUser>>(`${baseUrl}/${userId}`).then((response) => {
      return response.data;
    });
  },

  getStats(userId: string) {
    return instance
      .get<GenericResponseType<TProfileStats>>(`${baseUrl}/${userId}/stats`)
      .then((response) => {
        return response.data;
      });
  },

  updateStatus(status: string) {
    return instance
      .put<GenericResponseType<void>>(`${baseUrl}/status`, { status })
      .then((response) => {
        return response.data;
      });
  },

  saveProfile(userId: string, data: FormData) {
    return instance
      .post<GenericResponseType<void>>(`${baseUrl}/${userId}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        return response.data;
      });
  },

  toggleFollowUser(userId: string, query: string) {
    return instance
      .put<GenericResponseType<void>>(`${baseUrl}/${userId}/toggle-follow${query}`)
      .then((response) => {
        return response.data;
      });
  },

  createFriendUser(userId: string, query: string) {
    return instance
      .put<GenericResponseType<void>>(`${baseUrl}/${userId}/create-friend${query}`)
      .then((response) => {
        return response.data;
      });
  },

  toggleFriendUser(userId: string, query: string) {
    return instance
      .put<GenericResponseType<void>>(`${baseUrl}/${userId}/toggle-friend${query}`)
      .then((response) => {
        return response.data;
      });
  },

  getNotifications(userId: string) {
    return instance
      .put<GenericResponseType<void>>(`${baseUrl}/${userId}/friend-ntf`)
      .then((response) => {
        return response.data;
      });
  },
};

export const profileApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: customFetchBase('/users'),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
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

export const { useChangeAvatarMutation } = profileApi;
