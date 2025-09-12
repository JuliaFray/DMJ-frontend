import { TArticle, TUser } from '../types';

// eslint-disable-next-line no-shadow
export const enum ResultCodes {
  Success = 0,
  Error = 1,
  ValidationError = 2,
  AccessDenied = 3,
  CaptchaIsRequired = 10,
}

export type GenericResponseType<D = unknown> = {
  data: D;
  message: string;
  resultCode: ResultCodes;
  token?: string;
};

export type LoginResponseType = {
  token: string;
  data: TUser;
  message: string;
  resultCode: ResultCodes;
};

export type CaptchaResponseType = {
  url: string;
};

export type UsersResponseType = {
  data: TUser[];
  totalCount: number;
  resultCode: ResultCodes;
  message: string;
};

export type PostsResponseType = {
  data: TArticle[];
  totalCount: number;
  resultCode: ResultCodes;
  message: string;
};
