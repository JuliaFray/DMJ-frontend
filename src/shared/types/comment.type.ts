import { IPost } from './post.type';
import { IUser } from './profile.type';

export interface IComment {
  _id?: string;
  userId?: IUser;
  postId?: IPost;
  text: string;
  rating?: number;
  userRating?: number;
  createdAt?: Date;
}
