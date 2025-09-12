import { TUser } from './profile.type';

export type TDietPlan = {
  _id: string;
  name: string;
  period: number;
  author: TUser;
  meals: Meal[];
  stats: {
    plan: TDietStat;
    fact: TDietStat;
    rating: number;
  };
};

export type TDietStat = {
  cal: number;
  proteins: number;
  fats: number;
  carb: number;
};

export enum Meal {
  Breakfast = 0,
  MorningSnack = 1,
  Lunch = 2,
  AfterNoonSnack = 3,
  Dinner = 4,
  EveningSnack = 5,
}
