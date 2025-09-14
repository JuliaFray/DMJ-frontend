import React, { FC, useState } from 'react';

import { Form, Formik } from 'formik';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';

import { Meal, TChipData, TDietPlan } from 'shared/types';
import { InputWrapper, SelectWrapper } from 'shared/ui';

interface Props {
  diet: TDietPlan;
}

export const DietConsist: FC<Props> = ({ diet }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleDelete = () => {
    setOpenDialog(false);
    console.log('delete');
  };

  return (
    <Paper variant='elevation' elevation={4} sx={{ padding: '30px' }}>
      <Stack spacing={4}>
        <Typography variant='h5'>{diet.name}</Typography>

        <Formik initialValues={diet} onSubmit={(v) => console.log(v)}>
          {({ isValid }) => (
            <Form>
              <Stack spacing={4}>
                <InputWrapper name='name' label='Название плана' />
                <InputWrapper name='period' label='Количество дней' />
                <SelectWrapper
                  name='meals'
                  label='Приемы пищи'
                  options={diet.meals.map(
                    (it) => ({ _id: it.toString(), value: Meal[it] }) as TChipData,
                  )}
                  multiple
                />
                <Box sx={{ display: 'flex', justifyContent: 'end', gap: '20px' }}>
                  <Button
                    type='button'
                    size='large'
                    variant='outlined'
                    onClick={() => setOpenDialog(true)}
                  >
                    Удалить
                  </Button>
                  <Button type='submit' size='large' disabled={!isValid} variant='contained'>
                    Сохранить
                  </Button>
                </Box>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Внимание</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить план питания навсегда?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            type='button'
            size='large'
            variant='outlined'
            onClick={() => setOpenDialog(false)}
          >
            Отмена
          </Button>
          <Button type='button' size='large' variant='contained' onClick={handleDelete}>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
