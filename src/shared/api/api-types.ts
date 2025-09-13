import { TArticle, TUser } from '../types';

// eslint-disable-next-line no-shadow
export const enum ResultCodes {
  Success = 0,
  Error = 1,
  ValidationError = 2,
  AccessDenied = 3,
  CaptchaIsRequired = 10,
}

export interface GenericResponseType<D = unknown> {
  data: D;
  message: string;
  resultCode: ResultCodes;
  token: string;
}

export type LoginResponseType = GenericResponseType<TUser>;

export type CaptchaResponseType = {
  url: string;
};

export interface UsersResponseType extends GenericResponseType<TUser[]> {
  totalCount: number;
}

export interface PostsResponseType extends GenericResponseType<TArticle[]> {
  totalCount: number;
}
