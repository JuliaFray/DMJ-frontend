import {PhotoType, UserType} from '../types/types';

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export type GenericResponseType<D = {}> = {
    data: D,
    messages: Array<string>,
    resultCode: ResultCodeEnum
}


export type MeResponseType = {
    id: number,
    email: string,
    login: string
}

export type LoginResponseType = {
    id: number
}

export type CaptchaResponseType = {
    url: string
}

export type PhotoResponseType = {
    photos: PhotoType
}

export type UsersResponseType = {
    items: Array<UserType>,
    totalCount: number,
    error: string | null
}
