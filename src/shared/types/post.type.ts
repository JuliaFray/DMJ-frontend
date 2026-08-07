import { IComment } from './comment.type';
import { IUser } from './profile.type';
import { TChipData } from './tag.type';

export interface IImage {
  _id: string;
  files_id?: string;
  data?: any;
  contentType?: string;
}

export interface IPost {
  _id: string;
  title: string;
  text: string;
  tags: TChipData[];
  imageId?: string;
  image?: IImage;
  userId: IUser;
  viewsCount: number;
  likes: number;
  dateStr: string;
  createdAt: Date;
  comments: IComment[];
  rating: number;
  userRating: number;
}
