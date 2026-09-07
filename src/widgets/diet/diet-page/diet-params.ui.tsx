import React, { FC } from 'react';

import { Stack } from '@mantine/core';

import { Meal } from 'shared/types';
import { InputWrapper } from 'shared/ui';
//
// const mealsOptions: TChipData[] = [
//   { _id: 'Breakfast', value: Meal.Breakfast },
//   { _id: 'MorningSnack', value: Meal.MorningSnack },
//   { _id: 'Lunch', value: Meal.Lunch },
//   { _id: 'AfterNoonSnack', value: Meal.AfterNoonSnack },
//   { _id: 'Dinner', value: Meal.Dinner },
//   { _id: 'EveningSnack', value: Meal.EveningSnack },
// ];

const mealsOptions: string[] = [
  Meal.Breakfast,
  Meal.MorningSnack,
  Meal.Lunch,
  Meal.AfterNoonSnack,
  Meal.Dinner,
  Meal.EveningSnack,
];

export const DietParams: FC = () => {
  return (
    <Stack gap='sm'>
      <InputWrapper name='name' label='Название плана' />
      <InputWrapper name='period' label='Количество дней' type='number' />
      <InputWrapper name='meals' label='Приемы пищи' type='multiselect' data={mealsOptions} />
    </Stack>
  );
};
