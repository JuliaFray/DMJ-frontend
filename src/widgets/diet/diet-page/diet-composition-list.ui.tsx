import React, { Dispatch, FC, SetStateAction } from 'react';

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

import { useRemoveFoodMutation } from 'shared/api';
import { dayOptions } from 'shared/constants';
import { IFood, IDietPlan } from 'shared/types';
import { IPlanByDay, IPortion } from 'shared/types/diet.type';
import { TabPanel } from 'shared/ui';

import { DietStats } from './diet-stats.ui';
import styles from './diet.module.scss';

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
  tabIndex: number | string;
  currentDay: number;
  setCurrentDay: Dispatch<SetStateAction<number>>;
  diet: IDietPlan;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  portions: IPortion[];
}

export const DietConsistList: FC<Props> = ({
  tabIndex,
  currentDay,
  setCurrentDay,
  diet,
  setOpenDialog,
  portions,
}) => {
  const summaryWeight = portions.reduce((acc, current) => acc + current.weightG, 0) ?? 0;

  const listRows = portions?.map((portion) => createListData(portion, summaryWeight)) || [];

  const [removeFood] = useRemoveFoodMutation();

  const handleRemoveFood = (foodId: string) => {
    removeFood({ id: diet._id, foodId, day: currentDay });
  };

  return (
    <TabPanel value={tabIndex} index={DIET_COMPOSITION_TABS.DIET_COMPOSITION_LIST}>
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
              <TableCell
                variant='head'
                component='th'
                align='right'
                style={{ fontWeight: '600', width: `${55 / 5}%` }}
              >
                Объем (г)
              </TableCell>
              <TableCell
                variant='head'
                component='th'
                align='right'
                style={{ fontWeight: '600', width: `${55 / 5}%` }}
              >
                ккал
              </TableCell>
              <TableCell
                variant='head'
                component='th'
                align='right'
                style={{ fontWeight: '600', width: `${55 / 5}%` }}
              >
                Белки (г)
              </TableCell>
              <TableCell
                variant='head'
                component='th'
                align='right'
                style={{ fontWeight: '600', width: `${55 / 5}%` }}
              >
                Жиры (г)
              </TableCell>
              <TableCell
                variant='head'
                component='th'
                align='right'
                style={{ fontWeight: '600', width: `${55 / 5}%` }}
              >
                Углев. (г)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listRows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ padding: 0 }}>
                  <IconButton onClick={() => handleRemoveFood(row._id)}>
                    <DeleteIcon color='error' />
                  </IconButton>
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.weight}</TableCell>
                <TableCell align='right'>{row.calories.toFixed(2)}</TableCell>
                <TableCell align='right'>{row.protein.toFixed(2)}</TableCell>
                <TableCell align='right'>{row.fat.toFixed(2)}</TableCell>
                <TableCell align='right'>{row.carbs.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DietStats plan={diet.userId.targetStat} portions={portions} currentDay={currentDay} />
    </TabPanel>
  );
};
