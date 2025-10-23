import { ILoginData, TUser } from '../types';

import { instance } from './api';
import { GenericResponseType } from './api-types';

export const loginAPI = {
  register(data: ILoginData) {
    return instance.post<GenericResponseType<TUser>>(`auth/register`, data).then((response) => {
      return response.data;
    });
  },

  login(data: ILoginData) {
    return instance.post<GenericResponseType<TUser>>(`auth/login`, data).then((response) => {
      return response.data;
    });
  },

  logout() {
    return instance.delete<GenericResponseType<void>>(`auth/login`).then((response) => {
      return response.data;
    });
  },
  confirm({ email, token }) {
    return instance
      .get<GenericResponseType<void>>(`auth/confirmation/${email}/${token}`)
      .then((response) => {
        return response.data;
      });
  },
};
