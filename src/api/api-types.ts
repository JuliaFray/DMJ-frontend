import {IPhoto, IUser} from '../types/types';

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    ValidationError = 2,
    CaptchaIsRequired = 10
}

export type GenericResponseType<D = {}> = {
    data: D,
    message: string,
    resultCode: ResultCodeEnum
}

export type LoginResponseType = {
    token: string,
    data: IUser,
    message: string,
    resultCode: ResultCodeEnum,
}

export type CaptchaResponseType = {
    url: string
}

export type PhotoResponseType = {
    photos: IPhoto
}

export type UsersResponseType = {
    data: IUser[],
    totalCount: number,
    resultCode: ResultCodeEnum,
}
