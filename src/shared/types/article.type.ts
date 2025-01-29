import { TChipData, TComment, TUser } from "shared";

export type TArticle = {
  _id: string;
  title: string;
  text: string;
  tags: TChipData[];
  imageId?: string;
  image?: TImage;
  author: TUser;
  viewsCount: number;
  likes: number;
  dateStr: string;
  createdAt: Date;
  comments: TComment[];
  rating: number;
  userRating: number;
};

export type TImage = {
  _id: string;
  files_id?: string;
  data?: any;
  contentType?: string;
};
