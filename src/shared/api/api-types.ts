// eslint-disable-next-line no-shadow
export const enum ResultCodes {
  Success = 200,
  ValidationError = 400,
  AccessDenied = 403,
  NotFound = 404,
  UndefinedError = 500,
}

export interface ErrorResponse {
  message: string;
  resultCode: ResultCodes;
}

export interface GenericResponseType<D> extends ErrorResponse {
  data: D;
  token: string;
}

export interface CountResponseType<D> extends GenericResponseType<D> {
  totalCount: number;
}
