import React, { useState } from 'react';

import { useParams } from 'react-router-dom';

import { Grid, Paper } from '@mui/material';

import { DiaryBlock } from 'widgets/diary';

import { useAppDispatch, useMedia } from 'shared/hook';
import { Meal } from 'shared/types';
import { Calendar } from 'shared/ui/calendar';

import { AddFood } from '../../widgets/diet/diet-page/add-food.ui';

export const DietDiaryPage = () => {
  const { mdMain } = useMedia();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const listRows = [];

  const handleRemoveFood = (foodId: string) => {
    // removeFood({ id: diet._id, foodId, day: currentDay });
    console.log('remove');
  };

  const handleAddFood = (meal: Meal) => {
    setOpenDialog(true);
  };

  return (
    <Grid container spacing={2} width='100%' style={{ margin: 0, padding: 0 }}>
      <Grid item md={mdMain} width='100%' style={{ margin: 0, padding: 0 }}>
        <Paper variant='elevation' elevation={4} sx={{ padding: '16px' }}>
          <Calendar />
          <DiaryBlock
            mealTitle={Meal.Breakfast}
            handleAddFood={() => handleAddFood(Meal.Breakfast)}
          />
          <DiaryBlock mealTitle={Meal.Lunch} handleAddFood={() => handleAddFood(Meal.Lunch)} />

          <AddFood openDrawer={openDialog} setOpenDrawer={setOpenDialog} day={1} meals={[]} />
          {/* <DietStats plan={diet.author.healthInfo.plan} foodRows={listRows} currentDay={1} /> */}
        </Paper>
      </Grid>
    </Grid>
  );
};
