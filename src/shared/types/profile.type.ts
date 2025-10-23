import { TImage } from './article.type';

export type TProfileStats = {
  [posts: string]: number;
  favorites: number;
  friends: number;
  rating: number;
  comments: number;
  marks: number;
};

export interface TUser extends Record<string, unknown> {
  _id: string;
  userId: string;
  login: string;
  email: string;
  avatarId?: string;
  avatar?: TImage;
  birthDate?: Date;
  friends?: TUser[];
  followers?: TUser[];
  isFollowed?: boolean;
  isFriend?: boolean;
  createdAt?: Date;
}

export type ILoginData = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: string | null;
};

export type IFilter = {
  term: string;
  friend: boolean | null;
};

export type RegisterDataType = {
  login: string;
  email: string;
  password: string;
};
