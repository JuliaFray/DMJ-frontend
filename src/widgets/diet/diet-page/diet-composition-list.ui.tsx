import React, { Dispatch, FC, SetStateAction } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, FormControl, IconButton, Toolbar } from '@mui/material';

import { Container, Table } from '@mantine/core';

import { useRemoveFoodFromDietPlanMutation } from 'shared/api';
import { dayOptions } from 'shared/constants';
import { IDietPlan } from 'shared/types';
import { IPortion } from 'shared/types/diet.type';
import { InputWrapper } from 'shared/ui';

import { DietStats } from './diet-stats.ui';

interface ICompositionRow {
  _id: string;
  name: string;
  weight: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

const createListData = (portion: IPortion, summaryWeight: number): ICompositionRow => {
  const {
    foodId: {
      _id,
      name,
      statOn100: { cal, proteins, carb, fats },
    },
  } = portion;

  const mult = summaryWeight / 100;

  return {
    _id,
    name,
    weight: summaryWeight,
    calories: cal * mult,
    fat: fats * mult,
    carbs: carb * mult,
    protein: proteins * mult,
  };
};

interface Props {
  currentDay: number;
  setCurrentDay: (newDay: string) => void;
  diet: IDietPlan;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  portions: IPortion[];
}

export const DietConsistList: FC<Props> = ({
  currentDay,
  setCurrentDay,
  diet,
  setOpenDialog,
  portions,
}) => {
  const summaryWeight = portions.reduce((acc, current) => acc + current.weightG, 0) ?? 0;

  const listRows = portions?.map((portion) => createListData(portion, summaryWeight)) || [];

  const [removeFood] = useRemoveFoodFromDietPlanMutation();

  const handleRemoveFood = (foodId: string) => {
    removeFood({ id: diet._id, foodId, day: currentDay });
  };

  return (
    <>
      <FormControl fullWidth>
        <InputWrapper
          name='currentDay'
          label='День плана'
          mode='select'
          data={dayOptions.slice(0, diet.period)}
          onChange={(e) => setCurrentDay(e)}
        />
      </FormControl>

      <Container>
        <Toolbar style={{ justifyContent: 'end' }}>
          <Button
            startIcon={<AddIcon />}
            type='button'
            size='large'
            variant='text'
            onClick={() => setOpenDialog(true)}
          >
            Добавить продукт
          </Button>
        </Toolbar>
      </Container>

      <Table verticalSpacing='sm' highlightOnHover>
        <Table.Thead>
          <Table.Tr key='header'>
            <Table.Th style={{ width: '5%' }} />
            <Table.Th style={{ width: '40%' }} />
            <Table.Th>Объем (г)</Table.Th>
            <Table.Th>ккал</Table.Th>
            <Table.Th>Белки (г)</Table.Th>
            <Table.Th>Жиры (г)</Table.Th>
            <Table.Th>Углев. (г)</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {listRows.map((row) => (
            <Table.Tr key={row.name}>
              <Table.Td style={{ padding: 0 }}>
                <IconButton onClick={() => handleRemoveFood(row._id)}>
                  <DeleteIcon color='error' />
                </IconButton>
              </Table.Td>
              <Table.Td component='th' scope='row'>
                {row.name}
              </Table.Td>
              <Table.Td align='right'>{row.weight}</Table.Td>
              <Table.Td align='right'>{row.calories.toFixed(2)}</Table.Td>
              <Table.Td align='right'>{row.protein.toFixed(2)}</Table.Td>
              <Table.Td align='right'>{row.fat.toFixed(2)}</Table.Td>
              <Table.Td align='right'>{row.carbs.toFixed(2)}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <DietStats
        plan={diet.userId.config.targets.targetStat}
        portions={portions}
        currentDay={currentDay}
      />
    </>
  );
};
