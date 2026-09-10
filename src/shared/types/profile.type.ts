import { Nutrients } from 'shared/types/food.type';
import { Nullable } from 'shared/types/general.type';

import { IImage } from './post.type';

type Theme = 'light' | 'dark';
type Locale = 'ru';
export type Gender = 'male' | 'female' | 'other';
export type ActivityLevel =
  | 'sedentary'
  | 'lightly_active'
  | 'moderately_active'
  | 'very_active'
  | 'extremely_active';

export type TProfileStats = {
  [posts: string]: number;
  favorites: number;
  friends: number;
  rating: number;
  comments: number;
  marks: number;
};

export interface IUserStats {
  followersCount?: number;
  folowsCount?: number;
  postCount?: number;
  isFollowed: boolean;
}

export interface IUserConfig {
  // common config
  theme: Theme;
  locale: Locale;
  // personal data
  age: Nullable<number>;
  gender: Gender;
  weight?: Nullable<number>;
  height?: Nullable<number>;
  birthDate?: Date;
  activityLevel: ActivityLevel;
  // targets
  goal: string;
  targets: {
    targetWeight: number;
    targetDate: Date;
    targetWater: number;
    targetStat: Nutrients;
  };
}

export interface IUser extends Record<string, unknown> {
  _id: string;
  userId: string;
  login: string;
  email: string;
  avatarId?: string;
  avatar?: IImage;
  friends?: IUser[];
  followers?: IUser[];
  isFollowed?: boolean;
  isFriend?: boolean;
  createdAt?: Date;
  stats?: IUserStats;
  config: IUserConfig;
}

export type IUserWithTargets = IUser & IUserConfig;

export type ILoginData = {
  email: string;
  password: string;
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
