import {TImage} from "entities/article";

export interface TProfile extends Record<string, any> {
    _id: string,
    userId: string,
    firstName: string,
    secondName: string,
    lastName?: string,
    avatarId: string,
    avatar: TImage,
    city: string,
    age: string,
    description: string,
    isFollowed: boolean,
    createdAt?: Date
}

export type TProfileStats = {
    [posts: string]: number,
    favorites: number,
    friends: number,
    rating: number,
    comments: number,
    marks: number
}

export type TUser = {
    _id: string,
    firstName: string,
    secondName: string,
    lastName?: string,
    avatarId: string,
    avatar: TImage,
    friends: TProfile[],
    followers: TProfile[],
    isFollowed: boolean,
    isFriend: boolean
}
