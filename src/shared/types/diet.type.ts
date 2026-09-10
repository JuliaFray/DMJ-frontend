import { Nutrients, ProductItem } from 'shared/types/food.type';

import { IUser } from './profile.type';

/** Приемы пищи */
// eslint-disable-next-line no-shadow
export enum Meal {
  Breakfast = 'Завтрак',
  MorningSnack = 'Утренний перекус',
  Lunch = 'Обед',
  AfterNoonSnack = 'Обеденный перекус',
  Dinner = 'Ужин',
  EveningSnack = 'Вечерний перекус',
}

export type MealsOptions =
  | 'Breakfast'
  | 'MorningSnack'
  | 'Lunch'
  | 'AfterNoonSnack'
  | 'Dinner'
  | 'EveningSnack';

export interface IDietRingStat {
  label: string;
  stat: string;
  progress: number;
  color: string;
  icon?: string;
}

// /** Статистика плана питания */
// export interface IDietStat {
//   calories: number;
//   proteins: number;
//   fats: number;
//   carbs: number;
//   otherNutrients?: Record<string, number>;
// }
//
// /** Добавленное блюдо */
// export interface IFood {
//   _id: string;
//   name: string;
//   /** Показатели на 100г */
//   statOn100: IDietStat;
// }

export interface IPortion {
  foodId: ProductItem;
  portion: { meal: MealsOptions; weightG: number }[];
}

export interface IPlanByDay {
  day: number;
  /** Рейтинг каждого дня */
  dayRating: number;
  portions: IPortion[];
}

/** План питания */
export interface IDietPlan {
  _id: string;
  /** Наименование плана питания */
  name: string;
  /** Количетсво дней */
  period: number;
  /** Создатель */
  userId: IUser;
  /** Приемы пищи в плане */
  meals: MealsOptions[];
  /** Статистика плана питания */
  statResult: Nutrients & {
    /** Рейтинг плана */
    planRating: number;
  };
  /** Список продуктов в плане питания */
  planByDay: IPlanByDay[];
}

export interface IDiaryRecord {
  /** Создатель */
  userId: IUser;
  day: Date;
  portions: IPortion[];
}
