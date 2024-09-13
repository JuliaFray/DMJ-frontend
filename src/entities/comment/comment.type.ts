import {TUser} from "entities/profile";

export type TComment = {
    _id?: string,
    text: string,
    author?: TUser | null,
    rating?: number,
    userRating?: number,
    createdAt?: Date
}


export type TCommentsBlock = {
    items: TComment[],
    children: any,
    isLoading: boolean
}

export type TCommentType = {
    item: TComment,
    isLoading: boolean
}
