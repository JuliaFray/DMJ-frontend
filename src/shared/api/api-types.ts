import {TArticle} from 'entities/article';
import {TUser} from 'entities/profile';

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    ValidationError = 2,
    AccessDenied = 3,
    CaptchaIsRequired = 10
}

export type GenericResponseType<D = {}> = {
    data: D,
    message: string,
    resultCode: ResultCodeEnum,
    token?: string
}

export type LoginResponseType = {
    token: string,
    data: TUser,
    message: string,
    resultCode: ResultCodeEnum,
}

export type CaptchaResponseType = {
    url: string
}

export type UsersResponseType = {
    data: TUser[],
    totalCount: number,
    resultCode: ResultCodeEnum,
    message: string,
}

export type PostsResponseType = {
    data: TArticle[],
    totalCount: number,
    resultCode: ResultCodeEnum,
    message: string,
}
