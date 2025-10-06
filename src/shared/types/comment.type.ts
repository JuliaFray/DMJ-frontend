import { TUser } from './profile.type';

export type TComment = {
  _id?: string;
  text: string;
  author?: TUser | null;
  rating?: number;
  userRating?: number;
  createdAt?: Date;
};

export type TCommentType = {
  item: TComment;
  isLoading: boolean;
};
