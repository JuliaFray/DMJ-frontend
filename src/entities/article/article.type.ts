import {TComment} from 'entities/comment';
import {TUser} from "entities/profile";
import {TChipData} from 'entities/tag';

export type TArticle = {
    _id: string,
    title: string,
    text: string,
    tags: TChipData[],
    imageId?: string,
    image?: TImage,
    author: TUser
    viewsCount: number,
    likes: number,
    dateStr: string,
    createdAt: Date,
    comments: TComment[],
    rating: number,
    userRating: number
}

export type TImage = {
    _id: string,
    files_id?: string,
    data?: any,
    contentType?: string
};
