import React, { FC, useEffect, useState } from 'react';

import { Container, Tab, Tabs } from '@mui/material';

import { useQueryParams, useSetTabToQuery } from 'shared/hook';
import { IDietPlan } from 'shared/types';
import { a11yProps } from 'shared/utils';

import { AddFood } from './add-food.ui';
import { DietConsistFood } from './diet-composition-food.ui';
import { DietConsistList } from './diet-composition-list.ui';

interface Props {
  diet: IDietPlan;
}

// eslint-disable-next-line no-shadow
export enum DIET_COMPOSITION_TABS {
  DIET_COMPOSITION_FOOD = 'food',
  DIET_COMPOSITION_LIST = 'list',
}

export const DietPlanComposition: FC<Props> = ({ diet }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [tabIndex, setTabIndex] = useState<string>(DIET_COMPOSITION_TABS.DIET_COMPOSITION_FOOD);

  const [currentDay, setCurrentDay] = useState<number>(1);

  const { queryParams, setQueryParams } = useQueryParams();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    const tab = Object.values(DIET_COMPOSITION_TABS)[newValue];
    setTabIndex(tab);
    setQueryParams({ ...queryParams, view: tab });
  };

  useSetTabToQuery([
    {
      setter: setTabIndex,
      queryParams: queryParams.view as string,
      additional: DIET_COMPOSITION_TABS.DIET_COMPOSITION_FOOD,
    },
    {
      setter: setCurrentDay,
      queryParams: queryParams.day as number,
      additional: 1,
    },
  ]);

  const { planByDay } = diet;
  const portions = planByDay?.find((food) => food.day === currentDay)?.portions || [];

  return (
    <Container style={{ padding: '0' }}>
      <Tabs value={tabIndex} onChange={handleTabChange} centered variant='fullWidth'>
        <Tab label='Приемы пищи' {...a11yProps(DIET_COMPOSITION_TABS.DIET_COMPOSITION_FOOD)} />
        <Tab label='Список' {...a11yProps(DIET_COMPOSITION_TABS.DIET_COMPOSITION_LIST)} />
      </Tabs>

      <DietConsistFood
        diet={diet}
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
        tabIndex={tabIndex}
        setOpenDialog={setOpenDialog}
        portions={portions}
      />
      <DietConsistList
        tabIndex={tabIndex}
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
        diet={diet}
        setOpenDialog={setOpenDialog}
        portions={portions}
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
