import React, { FC, useEffect, useState } from 'react';

import { Container, Tab, Tabs } from '@mui/material';

import { TDietPlan } from 'shared/types';
import { a11yProps } from 'shared/utils';

import { AddFood } from './add-food.ui';
import { DietConsistFood } from './diet-consist-food.ui';
import { DietConsistList } from './diet-consist-list.ui';

interface Props {
  diet: TDietPlan;
}

export const DietConsist: FC<Props> = ({ diet }) => {
  const [openDialog, setOpenDialog] = useState(false);
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

  return (
    <Container style={{ padding: '0' }}>
      <Tabs value={tabIndex} onChange={handleTabChange} centered variant='fullWidth'>
        <Tab label='Приемы пищи' {...a11yProps(0)} />
        <Tab label='Список' {...a11yProps(1)} />
      </Tabs>

      <DietConsistFood
        diet={diet}
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
        tabIndex={tabIndex}
        setOpenDialog={setOpenDialog}
        filteredFoods={filteredFoods}
      />
      <DietConsistList
        tabIndex={tabIndex}
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
        diet={diet}
        setOpenDialog={setOpenDialog}
        filteredFoods={filteredFoods}
      />

      <AddFood
        openDrawer={openDialog}
        setOpenDrawer={setOpenDialog}
        day={currentDay}
        meals={diet.meals}
      />
    </Container>
  );
};
