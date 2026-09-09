import React, { FC, useEffect } from 'react';

import { round } from 'lodash';
import { Row } from 'rsuite';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { Box, Grid, Group, Progress, Stack, Text } from '@mantine/core';

import { useAppDispatch } from 'shared/hook';
import { dietActions } from 'shared/model';
import { IDietStat, IPortion } from 'shared/types';
import { StyledRating } from 'shared/ui';

import styles from './diet.module.scss';

const calcPercent = (planValue: number, factValue: number): number => {
  return Math.round((factValue / planValue) * 100);
};
const MULT_COEF = 5 / 4;

const calcRating = (plan: IDietStat, fact: IDietStat) => {
  return round(
    5 -
      ((MULT_COEF * Math.abs(plan.cal - fact.cal)) / plan.cal +
        (MULT_COEF * Math.abs(plan.proteins - fact.proteins)) / plan.proteins +
        (MULT_COEF * Math.abs(plan.carb - fact.carb)) / plan.carb +
        (MULT_COEF * Math.abs(plan.fats - fact.fats)) / plan.fats),
    2,
  );
};

const getColor = (mult: number) => {
  if (mult >= 0.8 && mult < 1) {
    return 'teal';
  }
  if (mult > 1) {
    return 'red';
  }
  return 'yellow';
};

interface Props {
  plan?: IDietStat;
  portions: IPortion[];
  currentDay: number;
}

export const DietStats: FC<Props> = ({ plan, portions, currentDay }) => {
  if (!plan) {
    return null;
  }
  const dispatch = useAppDispatch();

  const getSummaryWeight = (p: IPortion) => {
    return p.portion.reduce((acc, current) => acc + current.weightG, 0) ?? 0;
  };

  const fact = portions
    .map((p) => {
      const {
        foodId: { statOn100 },
      } = p;

      const { cal, proteins, carb, fats } = statOn100 || {};

      const m = getSummaryWeight(p) / 100;

      return {
        cal: m * cal,
        proteins: m * proteins,
        fats: m * fats,
        carb: m * carb,
      };
    })
    .reduce(
      (acc, current) => ({
        ...acc,
        proteins: acc.proteins + current.proteins,
        fats: acc.fats + current.fats,
        carb: acc.carb + current.carb,
        cal: acc.cal + current.cal,
      }),
      {
        proteins: 0,
        fats: 0,
        carb: 0,
        cal: 0,
      },
    );

  const rating = calcRating(plan, fact);

  useEffect(() => {
    dispatch(dietActions.setDayRating({ dayName: currentDay, rating }));
  }, [currentDay, dispatch, rating]);

  return (
    <Stack style={{ marginTop: '24px' }} className={styles.root}>
      <Grid>
        <Grid.Col span={4}>
          <Text>Каллории</Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Group wrap='nowrap'>
            <Progress
              value={calcPercent(plan.cal, fact.cal)}
              color={getColor(fact.cal / plan.cal)}
              className={styles.stat}
            />
            <Text className={styles.percent}>{calcPercent(plan.cal, fact.cal)} %</Text>
          </Group>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={4}>
          <Text>Белки</Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Group wrap='nowrap'>
            <Progress
              value={calcPercent(plan.proteins, fact.proteins)}
              color={getColor(fact.proteins / plan.proteins)}
              className={styles.stat}
            />
            <Text className={styles.percent}>{calcPercent(plan.proteins, fact.proteins)} %</Text>
          </Group>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={4}>
          <Text>Жиры</Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Group wrap='nowrap'>
            <Progress
              value={calcPercent(plan.fats, fact.fats)}
              color={getColor(fact.fats / plan.fats)}
              className={styles.stat}
            />
            <Text className={styles.percent}>{calcPercent(plan.fats, fact.fats)} %</Text>
          </Group>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={4}>
          <Text>Углеводы</Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Group wrap='nowrap'>
            <Progress
              value={calcPercent(plan.carb, fact.carb)}
              color={getColor(fact.carb / plan.carb)}
              className={styles.stat}
            />
            <Text className={styles.percent}>{calcPercent(plan.carb, fact.carb)} %</Text>
          </Group>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={4}>
          <Text>Рейтинг</Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <StyledRating value={calcRating(plan, fact)} />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
