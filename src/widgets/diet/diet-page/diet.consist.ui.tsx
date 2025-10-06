import React, { FC, useEffect, useState } from 'react';

import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from '@mui/material';

import { Meal, TChipData, TDietPlan } from 'shared/types';
import { Food } from 'shared/types/diet.type';
import { TabPanel } from 'shared/ui';
import { a11yProps } from 'shared/utils';

import { DietStats } from './diet-stats.ui';

interface Props {
  diet: TDietPlan;
}

const createData = (food: Food, currentDay: number) => {
  const { name, days } = food;
  const meals = days.find((day) => day.day === currentDay)?.meals;
  return {
    name,
    meals: meals?.map((meal) => ({ mealName: Meal[meal.meal], volume: meal.volume })) || [],
  };
};

const createListData = (food: Food, currentDay: number) => {
  const {
    name,
    days,
    stat: { cal, proteins, carb, fats },
  } = food;
  const meals = days.find((day) => day.day === currentDay)?.meals;
  const summaryWeight = meals?.reduce((acc, current) => acc + current.volume, 0) ?? 0;
  const mult = summaryWeight / 100;

  return {
    name,
    weight: summaryWeight,
    calories: cal * mult,
    fat: fats * mult,
    carbs: carb * mult,
    protein: proteins * mult,
  };
};

const dayOptions: TChipData[] = [
  { _id: '1', value: 'День 1' },
  { _id: '2', value: 'День 2' },
  { _id: '3', value: 'День 3' },
  { _id: '4', value: 'День 4' },
  { _id: '5', value: 'День 5' },
  { _id: '6', value: 'День 6' },
  { _id: '7', value: 'День 7' },
];

export const DietConsist: FC<Props> = ({ diet }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  useEffect(() => {
    setTabIndex(0);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const [currentDay, setCurrentDay] = useState<number>(1);
  const { foods } = diet;
  const filteredFoods =
    foods?.filter((food) => food.days?.some((day) => day.day === currentDay)) || [];
  const listRows = filteredFoods?.map((food) => createListData(food, currentDay)) || [];
  const rows = filteredFoods?.map((food) => createData(food, currentDay)) || [];

  return (
    <Container style={{ padding: '0' }}>
      <Tabs value={tabIndex} onChange={handleTabChange} centered variant='fullWidth'>
        <Tab label='Приемы пищи' {...a11yProps(0)} />
        <Tab label='Список' {...a11yProps(1)} />
      </Tabs>

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

        <TableContainer style={{ marginTop: '16px' }}>
          <Table size='small' aria-label='simple table'>
            <TableHead>
              <TableRow key='header'>
                <TableCell variant='head' component='th' />
                {rows[0]?.meals.map((meal) => (
                  <TableCell variant='head' align='right' style={{ fontWeight: '600' }}>
                    {meal.mealName}
                  </TableCell>
                ))}
                <TableCell variant='head' align='right' style={{ fontWeight: '600' }}>
                  Итого
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row' style={{ fontWeight: '600' }}>
                    {row.name}
                  </TableCell>
                  {row?.meals.map((meal) => <TableCell align='right'>{meal.volume}</TableCell>)}
                  <TableCell align='right' style={{ fontWeight: '600' }}>
                    {row?.meals.reduce((acc, cur) => acc + cur.volume, 0)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <DietStats plan={diet.stat.plan} foodRows={filteredFoods} currentDay={currentDay} />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <TableContainer>
          <Table size='small' aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align='right'>Объем (г)</TableCell>
                <TableCell align='right'>ккал</TableCell>
                <TableCell align='right'>Белки (г)</TableCell>
                <TableCell align='right'>Жиры (г)</TableCell>
                <TableCell align='right'>Углеводы (г)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listRows.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell align='right'>{row.weight}</TableCell>
                  <TableCell align='right'>{row.calories}</TableCell>
                  <TableCell align='right'>{row.fat}</TableCell>
                  <TableCell align='right'>{row.carbs}</TableCell>
                  <TableCell align='right'>{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <DietStats plan={diet.stat.plan} foodRows={filteredFoods} currentDay={currentDay} />
      </TabPanel>
    </Container>
  );
};
