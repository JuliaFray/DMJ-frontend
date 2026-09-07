import { IUserWithTargets } from './profile.type';

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

export interface IDietRingStat {
  label: string;
  stat: string;
  progress: number;
  color: string;
  icon?: string;
}

/** Статистика плана питания */
export interface IDietStat {
  cal: number;
  proteins: number;
  fats: number;
  carb: number;
  otherNutrients?: Record<string, number>;
}

/** Добавленное блюдо */
export interface IFood {
  _id: string;
  name: string;
  /** Показатели на 100г */
  statOn100: IDietStat;
}

export interface IPortion {
  foodId: IFood;
  meal: Meal;
  weightG: number;
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
  userId: IUserWithTargets;
  /** Приемы пищи в плане */
  meals: Meal[];
  /** Статистика плана питания */
  statResult: IDietStat & {
    /** Рейтинг плана */
    planRating: number;
  };
  /** Список продуктов в плане питания */
  planByDay: IPlanByDay[];
}

export interface IDiaryRecord {
  /** Создатель */
  userId: IUserWithTargets;
  day: Date;
  portions: IPortion[];
}
