import React, { FC } from 'react';

import { Container, Stack } from '@mui/material';

import { Meal, TChipData, IDietPlan } from 'shared/types';
import { InputWrapper, SelectWrapper } from 'shared/ui';

const mealsOptions: TChipData[] = [
  { _id: 'Breakfast', value: Meal.Breakfast },
  { _id: 'MorningSnack', value: Meal.MorningSnack },
  { _id: 'Lunch', value: Meal.Lunch },
  { _id: 'AfterNoonSnack', value: Meal.AfterNoonSnack },
  { _id: 'Dinner', value: Meal.Dinner },
  { _id: 'EveningSnack', value: Meal.EveningSnack },
];

interface Props {
  diet: IDietPlan;
}

export const DietParams: FC<Props> = ({ diet }) => {
  if (!diet) {
    return null;
  }

  return (
    <Container style={{ marginBottom: '24px', padding: '0' }}>
      <Stack spacing={4}>
        <InputWrapper name='name' label='Название плана' />
        <InputWrapper name='period' label='Количество дней' />
        <SelectWrapper name='meals' label='Приемы пищи' options={mealsOptions} multiple />
      </Stack>
    </Container>
  );
};
