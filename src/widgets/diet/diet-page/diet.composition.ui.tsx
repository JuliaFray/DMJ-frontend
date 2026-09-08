import React, { FC, useState } from 'react';

import { Container, Tabs } from '@mantine/core';

import { useQueryParams, useSetTabToQuery } from 'shared/hook';
import { IDietPlan, Nullable } from 'shared/types';
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

  const handleTabChange = (newValue: Nullable<string>) => {
    if (newValue) {
      setTabIndex(newValue);
      setQueryParams({ ...queryParams, view: newValue });
    }
  };

  const handleDayChange = (newValue: Nullable<string>) => {
    if (newValue) {
      setCurrentDay(Number(newValue));
      setQueryParams({ ...queryParams, day: newValue });
    }
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
  const portions = planByDay?.find((food) => food.day === Number(currentDay))?.portions || [];

  return (
    <Container>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tabs.List grow>
          <Tabs.Tab {...a11yProps(DIET_COMPOSITION_TABS.DIET_COMPOSITION_FOOD)}>
            Приемы пищи
          </Tabs.Tab>
          <Tabs.Tab {...a11yProps(DIET_COMPOSITION_TABS.DIET_COMPOSITION_LIST)}>Нутриенты</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={DIET_COMPOSITION_TABS.DIET_COMPOSITION_FOOD}>
          <DietConsistFood
            diet={diet}
            currentDay={currentDay}
            setCurrentDay={handleDayChange}
            setOpenDialog={setOpenDialog}
            portions={portions}
          />
        </Tabs.Panel>

        <Tabs.Panel value={DIET_COMPOSITION_TABS.DIET_COMPOSITION_LIST}>
          <DietConsistList
            currentDay={currentDay}
            setCurrentDay={handleDayChange}
            diet={diet}
            setOpenDialog={setOpenDialog}
            portions={portions}
          />
        </Tabs.Panel>
      </Tabs>

      <AddFood
        openDrawer={openDialog}
        setOpenDrawer={setOpenDialog}
        day={currentDay}
        meals={diet.meals}
      />
    </Container>
  );
};
