import React, { Dispatch, FC, SetStateAction, useMemo } from 'react';

import { useSelector } from 'react-redux';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
} from '@mui/material';

import { useAddFoodMutation, useRemoveFoodMutation } from 'shared/api';
import { useWebSocket } from 'shared/hook';
import { SocketEvents } from 'shared/lib';
import { getAuthId } from 'shared/model';
import { Food, FoodList, Meal, TChipData, TDietPlan } from 'shared/types';
import { TabPanel } from 'shared/ui';

import { DietStats } from './diet-stats.ui';
import styles from './diet.module.scss';
import { InlineEditCell } from './inline-edit-cell';

const dayOptions: TChipData[] = [
  { _id: '1', value: 'День 1' },
  { _id: '2', value: 'День 2' },
  { _id: '3', value: 'День 3' },
  { _id: '4', value: 'День 4' },
  { _id: '5', value: 'День 5' },
  { _id: '6', value: 'День 6' },
  { _id: '7', value: 'День 7' },
];

const createData = (food: Food, currentDay: number) => {
  const { _id, name, days } = food;
  const meals = days.find((day) => day.day === currentDay)?.meals;
  return {
    _id,
    name,
    meals: meals?.map((meal) => ({ mealName: meal.meal, volume: meal.volume })) || [],
  };
};

interface Props {
  tabIndex: number;
  currentDay: number;
  setCurrentDay: Dispatch<SetStateAction<number>>;
  diet: TDietPlan;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  filteredFoods: Food[];
}

export const DietConsistFood: FC<Props> = ({
  tabIndex,
  currentDay,
  setCurrentDay,
  diet,
  setOpenDialog,
  filteredFoods,
}) => {
  const authId = useSelector(getAuthId);
  const ws = useWebSocket();
  const [removeFood] = useRemoveFoodMutation();

  const data = [...filteredFoods];
  const rows = useMemo(
    () => data?.map((food) => createData(food, currentDay)) || [],
    [data, currentDay],
  );

  const handleUpdateWeight = (foodId: string, meal: string, newVal: number) => {
    ws?.send(
      JSON.stringify({
        type: SocketEvents.CHANGE_WEIGHT_EVENT,
        id: diet._id,
        foodId,
        currentDay,
        meal,
        newVal,
        authId,
      }),
    );
  };

  const handleRemoveFood = (foodId: string) => {
    removeFood({ id: diet._id, foodId, day: currentDay });
  };

  return (
    <TabPanel value={tabIndex} index={0}>
      <FormControl fullWidth>
        <InputLabel id='simple-select-label'>День плана</InputLabel>
        <Select
          labelId='simple-select-label'
          id='simple-select'
          value={currentDay}
          label='День плана'
          onChange={(e) => setCurrentDay(Number(e.target.value))}
        >
          {dayOptions.slice(0, diet.period).map((opt) => (
            <MenuItem value={opt._id}>{opt.value}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Container sx={{ padding: '0!important' }}>
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

      <TableContainer style={{ marginTop: '16px' }} className={styles.table}>
        <Table size='small' aria-label='simple table'>
          <TableHead>
            <TableRow key='header'>
              <TableCell variant='head' component='th' style={{ width: '5%' }} />
              <TableCell variant='head' component='th' style={{ width: '40%' }} />
              {diet?.meals.map((meal) => (
                <TableCell
                  variant='head'
                  align='right'
                  style={{ fontWeight: '600', width: `${55 / (diet.meals.length + 1)}%` }}
                >
                  {Meal[meal]}
                </TableCell>
              ))}
              <TableCell
                variant='head'
                align='right'
                style={{ fontWeight: '600', width: `${55 / (diet.meals.length + 1)}%` }}
              >
                Итого
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <IconButton onClick={() => handleRemoveFood(row._id)}>
                    <DeleteIcon color='error' />
                  </IconButton>
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                {diet?.meals.map((meal) => (
                  <TableCell align='right'>
                    <InlineEditCell
                      initialValue={row.meals.find((it) => it.mealName === meal)?.volume || 0}
                      handleChange={(newVal) => handleUpdateWeight(row._id, meal, newVal)}
                    />
                  </TableCell>
                ))}
                <TableCell align='right' style={{ fontWeight: '600' }}>
                  {row?.meals.reduce((acc, cur) => acc + cur.volume, 0)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DietStats plan={diet.author.healthInfo.plan} foodRows={data} currentDay={currentDay} />
    </TabPanel>
  );
};
