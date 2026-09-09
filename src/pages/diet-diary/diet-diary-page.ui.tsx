import React, { useEffect, useState } from 'react';

import { Grid, Paper } from '@mui/material';

import { DiaryBlock } from 'widgets/diary';
import { AddFood } from 'widgets/diet';

import { useLazyGetDiaryByDayQuery } from 'shared/api';
import { useMedia } from 'shared/hook';
import { Meal } from 'shared/types';
import { DateType, TODAY, WeekCalendar } from 'shared/ui';

export const DietDiaryPage = () => {
  const { mdMain, mdSide } = useMedia();
  // const { id } = useParams();
  // const dispatch = useAppDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  // const listRows = [];

  const [date, setDate] = useState<DateType>(TODAY);

  const [getDiaryData] = useLazyGetDiaryByDayQuery();

  useEffect(() => {
    getDiaryData({ date: new Date(date.year, date.month, date.date).toISOString() });
  }, [date, getDiaryData]);

  // const handleRemoveFood = (foodId: string) => {
  //   // removeFood({ id: diet._id, foodId, day: currentDay });
  //   console.log('remove');
  // };

  const handleAddFood = (meal: Meal) => {
    setOpenDialog(true);
  };

  const handleChangeDate = (val: DateType) => {
    setDate(val);
  };

  return (
    <Grid container spacing={2} width='100%' style={{ margin: 0, padding: 0 }}>
      <Grid item md={mdMain} width='100%' style={{ margin: 0, padding: '0 16px' }}>
        {!mdSide && (
          <Paper
            variant='elevation'
            elevation={4}
            sx={{ marginBottom: '16px', paddingBottom: '16px' }}
          >
            <WeekCalendar isFull={false} onDayChange={handleChangeDate} />
          </Paper>
        )}

        <Paper variant='elevation' elevation={4} sx={{ padding: '16px' }}>
          <DiaryBlock
            mealTitle={Meal.Breakfast}
            handleAddFood={() => handleAddFood(Meal.Breakfast)}
          />
          <DiaryBlock mealTitle={Meal.Lunch} handleAddFood={() => handleAddFood(Meal.Lunch)} />
          <DiaryBlock mealTitle={Meal.Dinner} handleAddFood={() => handleAddFood(Meal.Dinner)} />

          <AddFood openDrawer={openDialog} setOpenDrawer={setOpenDialog} day={1} meals={[]} />
          {/* <DietStats plan={diet.author.healthInfo.plan} foodRows={listRows} currentDay={1} /> */}
        </Paper>
      </Grid>
      {!!mdSide && (
        <Grid item md={mdSide} width='100%' style={{ margin: 0, padding: '0 16px' }}>
          <Paper variant='elevation' elevation={4}>
            <WeekCalendar isFull onDayChange={handleChangeDate} />
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};
