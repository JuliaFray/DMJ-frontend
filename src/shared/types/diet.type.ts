import { TUser } from './profile.type';

// eslint-disable-next-line no-shadow
export enum Meal {
  Breakfast = 'Завтрак',
  MorningSnack = 'Утренний перекус',
  Lunch = 'Обед',
  AfterNoonSnack = 'Обеденный перекус',
  Dinner = 'Ужин',
  EveningSnack = 'Вечерний перекус',
}

/** Статистика плана питания */
export interface TDietStat {
  cal: number;
  proteins: number;
  fats: number;
  carb: number;
  otherNutrients?: any;
}

export interface Food {
  name: string;
  /** Распределение по дням */
  days: {
    /** Номер дня */
    day: number;
    /** Приемы пищи */
    meals: {
      /** Прием пищи */
      meal: Meal;
      /** Объем */
      volume: number;
    }[];
  }[];
  /** Показатели на 100г */
  stat: TDietStat;
}

/** План питания */
export interface TDietPlan {
  _id: string;
  /** Наименование плана питания */
  name: string;
  /** Количетсво дней */
  period: number;
  /** Создатель */
  author: TUser;
  /** Приемы пищи в плане */
  meals: Meal[];
  /** Статистика плана питания */
  stat: {
    /** Плановые показатели */
    plan: TDietStat;
    /** Фактические показатели */
    fact: TDietStat;
    /** Рейтинг плана */
    rating: number;
  };
  /** Список продуктов в плане питания */
  foods?: Food[];
}
