import React, { FC } from 'react';

import { Stack } from '@mantine/core';

import { Meal, TChipData } from 'shared/types';
import { InputWrapper } from 'shared/ui';

const mealsOptions: TChipData[] = [
  { _id: 'Breakfast', value: 'Breakfast', label: Meal.Breakfast },
  { _id: 'MorningSnack', value: 'MorningSnack', label: Meal.MorningSnack },
  { _id: 'Lunch', value: 'Lunch', label: Meal.Lunch },
  { _id: 'AfterNoonSnack', value: 'AfterNoonSnack', label: Meal.AfterNoonSnack },
  { _id: 'Dinner', value: 'Dinner', label: Meal.Dinner },
  { _id: 'EveningSnack', value: 'EveningSnack', label: Meal.EveningSnack },
];

export const DietParams: FC = () => {
  return (
    <Stack gap='sm'>
      <InputWrapper name='name' label='Название плана' />
      <InputWrapper name='period' label='Количество дней' mode='number' max={7} />
      <InputWrapper name='meals' label='Приемы пищи' mode='multiselect' data={mealsOptions} />
    </Stack>
  );
};
