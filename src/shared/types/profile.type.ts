import { IDietStat } from './diet.type';
import { IImage } from './post.type';

type Theme = 'light' | 'dark';
type Locale = 'ru';
type Gender = 'male' | 'female';
type ActivityLevel = 'low' | 'medium' | 'high';

export type TProfileStats = {
  [posts: string]: number;
  favorites: number;
  friends: number;
  rating: number;
  comments: number;
  marks: number;
};

export interface IUser extends Record<string, unknown> {
  _id: string;
  userId: string;
  login: string;
  email: string;
  avatarId?: string;
  avatar?: IImage;
  birthDate?: Date;
  friends?: IUser[];
  followers?: IUser[];
  isFollowed?: boolean;
  isFriend?: boolean;
  createdAt?: Date;
}

export interface IUserConfig {
  // common config
  theme: Theme;
  locale: Locale;
  // personal data
  gender?: Gender;
  weight?: number;
  height?: number;
  birthDate?: Date;
  activityLevel: ActivityLevel;
  // targets
  targets: {
    targetWeight: number;
    targetDate: Date;
    targetWater: number;
    targetStat: IDietStat;
  };
}

export type IUserWithTargets = IUser & IUserConfig['targets'];

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
