import React, { FC } from 'react';

import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';

import { theme } from 'shared/themes';
import { Meal } from 'shared/types';

import styles from '../diet/diet-page/diet.module.scss';

interface Props {
  mealTitle: Meal;
  handleAddFood: () => void;
}
export const DiaryBlock: FC<Props> = ({ mealTitle, handleAddFood }) => {
  return (
    <>
      <Container sx={{ padding: '0!important' }}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}
            color={theme.palette.primary.contrastText}
          >
            Завтрак
          </Typography>
          <Button
            startIcon={<AddIcon />}
            type='button'
            size='large'
            variant='text'
            onClick={handleAddFood}
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
            {/* {listRows.map((row) => ( */}
            {/*   <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}> */}
            {/*     <TableCell sx={{ padding: 0 }}> */}
            {/*       <IconButton onClick={() => handleRemoveFood(row._id)}> */}
            {/*         <DeleteIcon color='error' /> */}
            {/*       </IconButton> */}
            {/*     </TableCell> */}
            {/*     <TableCell component='th' scope='row'> */}
            {/*       {row.name} */}
            {/*     </TableCell> */}
            {/*     <TableCell align='right'>{row.weight}</TableCell> */}
            {/*     <TableCell align='right'>{row.calories.toFixed(2)}</TableCell> */}
            {/*     <TableCell align='right'>{row.protein.toFixed(2)}</TableCell> */}
            {/*     <TableCell align='right'>{row.fat.toFixed(2)}</TableCell> */}
            {/*     <TableCell align='right'>{row.carbs.toFixed(2)}</TableCell> */}
            {/*   </TableRow> */}
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
