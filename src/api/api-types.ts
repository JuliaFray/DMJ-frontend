import {IPost, IUser} from '../types/types';

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

export type UsersResponseType = {
    data: IUser[],
    totalCount: number,
    resultCode: ResultCodeEnum,
    message: string,
}

export type PostsResponseType = {
    data: IPost[],
    totalCount: number,
    resultCode: ResultCodeEnum,
    message: string,
}
