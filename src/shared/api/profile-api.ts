import { BaseQueryFn, createApi, EndpointBuilder } from '@reduxjs/toolkit/query/react';

import customFetchBase from 'shared/api/custom-fetch-base';
import { usersApi } from 'shared/api/users-api';

import { IUser, TProfileStats } from '../types';

import { instance } from './api';
import { GenericResponseType } from './api-types';

const baseUrl = 'users';
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
