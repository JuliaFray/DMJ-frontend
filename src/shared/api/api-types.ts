// eslint-disable-next-line no-shadow
export const enum ResultCodes {
  Success = 0,
  Error = 1,
  ValidationError = 2,
  AccessDenied = 3,
  CaptchaIsRequired = 10,
}

export interface GenericResponseType<D> {
  data: D;
  message: string;
  resultCode: ResultCodes;
  token: string;
}

export interface CountResponseType<D> extends GenericResponseType<D> {
  totalCount: number;
}

export type CaptchaResponseType = {
  url: string;
};
