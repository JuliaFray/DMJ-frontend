import React, { FC, useEffect } from 'react';

import { Row } from 'rsuite';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, LinearProgress, Stack, Typography } from '@mui/material';

import { useAppDispatch } from 'shared/hook';
import { dietActions } from 'shared/model';
import { IDietStat } from 'shared/types';
import { IPortion } from 'shared/types/diet.type';
import { StyledRating } from 'shared/ui';

import styles from './diet.module.scss';

const calcPercent = (planValue: number, factValue: number) => {
  return 20;
  // return Math.round((factValue / planValue) * 100);
};
const MULT_COEF = 5 / 4;

const calcRating = (plan: IDietStat, fact: IDietStat) => {
  return 1;
  // return (
  //   5 -
  //   ((MULT_COEF * Math.abs(plan.cal - fact.cal)) / plan.cal +
  //     (MULT_COEF * Math.abs(plan.proteins - fact.proteins)) / plan.proteins +
  //     (MULT_COEF * Math.abs(plan.carb - fact.carb)) / plan.carb +
  //     (MULT_COEF * Math.abs(plan.fats - fact.fats)) / plan.fats)
  // );
};

const getColor = (mult: number) => {
  if (mult >= 0.8 && mult < 1) {
    return 'secondary';
  }
  if (mult > 1) {
    return 'error';
  }
  return 'warning';
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
  const summaryWeight = portions.reduce((acc, current) => acc + current.weightG, 0) ?? 0;

  const fact = portions
    .map(
      ({
        foodId: {
          statOn100: { carb, fats, proteins, cal },
        },
      }) => {
        const m = summaryWeight / 100;
        return {
          cal: m * cal,
          proteins: m * proteins,
          fats: m * fats,
          carb: m * carb,
        };
      },
    )
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
      <Row className={styles.row}>
        <Box className={styles.wrapper}>
          <Typography>Каллории</Typography>
        </Box>
        <Box className={styles.wrapper}>
          <LinearProgress
            variant='determinate'
            className={styles.stat}
            value={calcPercent(plan.cal, fact.cal)}
            color={getColor(fact.cal / plan.cal)}
          />
          <Typography className={styles.percent}>{calcPercent(plan.cal, fact.cal)} %</Typography>
        </Box>
      </Row>
      <Row className={styles.row}>
        <Box className={styles.wrapper}>
          <Typography>Белки</Typography>
        </Box>
        <Box className={styles.wrapper}>
          <LinearProgress
            variant='determinate'
            className={styles.stat}
            value={calcPercent(plan.proteins, fact.proteins)}
            color={getColor(fact.proteins / plan.proteins)}
          />
          <Typography className={styles.percent}>
            {calcPercent(plan.proteins, fact.proteins)} %
          </Typography>
        </Box>
      </Row>
      <Row className={styles.row}>
        <Box className={styles.wrapper}>
          <Typography>Жиры</Typography>
        </Box>
        <Box className={styles.wrapper}>
          <LinearProgress
            variant='determinate'
            className={styles.stat}
            value={calcPercent(plan.fats, fact.fats)}
            color={getColor(fact.fats / plan.fats)}
          />
          <Typography className={styles.percent}>{calcPercent(plan.fats, fact.fats)} %</Typography>
        </Box>
      </Row>
      <Row className={styles.row}>
        <Box className={styles.wrapper}>
          <Typography>Углеводы</Typography>
        </Box>
        <Box className={styles.wrapper}>
          <LinearProgress
            variant='determinate'
            className={styles.stat}
            value={calcPercent(plan.carb, fact.carb)}
            color={getColor(fact.carb / plan.carb)}
          />
          <Typography className={styles.percent}>{calcPercent(plan.carb, fact.carb)} %</Typography>
        </Box>
      </Row>
      <Row className={styles.row}>
        <Box className={styles.wrapper}>
          <Typography>Рейтинг</Typography>
        </Box>
        <Box className={styles.wrapper}>
          <StyledRating
            emptyIcon={<FavoriteBorderIcon />}
            icon={<FavoriteIcon />}
            value={calcRating(plan, fact)}
            precision={0.1}
            readOnly
          />
        </Box>
      </Row>
    </Stack>
  );
};
