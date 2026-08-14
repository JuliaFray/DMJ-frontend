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

import { DIET_COMPOSITION_TABS } from 'widgets/diet/diet-page/diet.composition.ui';

import { useRemoveFoodFromDietPlanMutation } from 'shared/api';
import { dayOptions } from 'shared/constants';
import { useAuth, useWebSocket } from 'shared/context';
import { useQueryParams } from 'shared/hook';
import { SocketEvents } from 'shared/lib';
import { dietSelector } from 'shared/model';
import { IDietPlan, Meal } from 'shared/types';
import { IPortion } from 'shared/types/diet.type';
import { TabPanel } from 'shared/ui';

import { DietStats } from './diet-stats.ui';
import styles from './diet.module.scss';
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
  tabIndex: string;
  currentDay: number;
  setCurrentDay: Dispatch<SetStateAction<number>>;
  diet: IDietPlan;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  portions: IPortion[];
}

export const DietConsistFood: FC<Props> = ({
  tabIndex,
  currentDay,
  setCurrentDay,
  diet,
  setOpenDialog,
  portions,
}) => {
  const { authId } = useAuth();
  const planByDays = useSelector(dietSelector.getDietPlanByDay);
  const dayRating = planByDays?.find(({ day }) => day === currentDay)?.rating;

  const { queryParams, setQueryParams } = useQueryParams();

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
    <TabPanel value={tabIndex} index={DIET_COMPOSITION_TABS.DIET_COMPOSITION_FOOD}>
      <FormControl fullWidth>
        <InputLabel id='simple-select-label'>День плана</InputLabel>
        <Select
          labelId='simple-select-label'
          id='simple-select'
          value={currentDay}
          label='День плана'
          onChange={(e) => {
            setCurrentDay(Number(e.target.value));
            setQueryParams({ ...queryParams, day: Number(e.target.value) });
          }}
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
                      initialValue={row.meals.find((it) => it.meal === meal)?.weightG || 0}
                      handleChange={(newVal) =>
                        handleUpdateWeight(row._id, meal, newVal, dayRating)
                      }
                    />
                  </TableCell>
                ))}
                <TableCell align='right' style={{ fontWeight: '600' }}>
                  {row?.meals.reduce((acc, cur) => acc + cur.weightG, 0)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DietStats plan={diet.userId.targetStat} portions={portions} currentDay={currentDay} />
    </TabPanel>
  );
};
