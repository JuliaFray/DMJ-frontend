import React, { Dispatch, FC, SetStateAction, useMemo } from 'react';

import { useSelector } from 'react-redux';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, FormControl, IconButton, Toolbar } from '@mui/material';

import { Container, Table } from '@mantine/core';

import { useRemoveFoodFromDietPlanMutation } from 'shared/api';
import { dayOptions } from 'shared/constants';
import { useAuth, useWebSocket } from 'shared/context';
import { SocketEvents } from 'shared/lib';
import { dietSelector } from 'shared/model';
import { IDietPlan, Meal } from 'shared/types';
import { IPortion } from 'shared/types/diet.type';
import { InputWrapper } from 'shared/ui';

import { DietStats } from './diet-stats.ui';
import { InlineEditCell } from './inline-edit-cell';

interface ICompositionRow {
  _id: string;
  name: string;
  meals: {
    meal: string;
    weightG: number;
  }[];
}

const createData = (portion: IPortion): ICompositionRow => {
  return {
    _id: portion.foodId._id,
    name: portion.foodId.name,
    meals: [],
  };
};

interface Props {
  currentDay: number;
  setCurrentDay: (newDay: string) => void;
  diet: IDietPlan;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  portions: IPortion[];
}

export const DietConsistFood: FC<Props> = ({
  currentDay,
  setCurrentDay,
  diet,
  setOpenDialog,
  portions,
}) => {
  const { authId } = useAuth();
  const planByDays = useSelector(dietSelector.getDietPlanByDay);
  const dayRating = planByDays?.find(({ day }) => day === currentDay)?.dayRating;

  const ws = useWebSocket();
  const [removeFood] = useRemoveFoodFromDietPlanMutation();

  const rows = useMemo(
    () => [...portions]?.map((portion) => createData(portion)) || [],
    [portions],
  );

  const handleUpdateWeight = (foodId: string, meal: string, newVal: number, stat: any) => {
    ws?.send(
      JSON.stringify({
        type: SocketEvents.CHANGE_WEIGHT_EVENT,
        id: diet._id,
        foodId,
        currentDay,
        meal,
        newVal,
        authId,
        stat,
      }),
    );
  };

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
            {diet?.meals.map((meal) => (
              <Table.Th
                variant='head'
                align='right'
                style={{ fontWeight: '600', width: `${55 / (diet.meals.length + 1)}%` }}
              >
                {Meal[meal]}
              </Table.Th>
            ))}
            <Table.Th
              variant='head'
              align='right'
              style={{ fontWeight: '600', width: `${55 / (diet.meals.length + 1)}%` }}
            >
              Итого
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {rows.map((row) => (
            <Table.Tr key={row.name}>
              <Table.Td>
                <IconButton onClick={() => handleRemoveFood(row._id)}>
                  <DeleteIcon color='error' />
                </IconButton>
              </Table.Td>
              <Table.Td component='th' scope='row'>
                {row.name}
              </Table.Td>
              {diet?.meals.map((meal) => (
                <Table.Td align='right'>
                  <InlineEditCell
                    initialValue={row.meals.find((it) => it.meal === meal)?.weightG || 0}
                    handleChange={(newVal) => handleUpdateWeight(row._id, meal, newVal, dayRating)}
                  />
                </Table.Td>
              ))}
              <Table.Td align='right' style={{ fontWeight: '600' }}>
                {row?.meals.reduce((acc, cur) => acc + cur.weightG, 0)}
              </Table.Td>
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
