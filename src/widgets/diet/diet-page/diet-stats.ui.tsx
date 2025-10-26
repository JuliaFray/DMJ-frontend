import React, { FC, useEffect } from 'react';

import { Row } from 'rsuite';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, LinearProgress, Stack, Typography } from '@mui/material';

import { useAppDispatch } from 'shared/hook';
import { dietActions } from 'shared/model';
import { Food, TDietStat } from 'shared/types';
import { StyledRating } from 'shared/ui';

import styles from './diet.module.scss';

const calcPercent = (planValue: number, factValue: number) => {
  return Math.round((factValue / planValue) * 100);
};

const calcRating = (plan: TDietStat, fact: TDietStat) => {
  return (
    5 -
    (((5 / 4) * Math.abs(plan.cal - fact.cal)) / plan.cal +
      ((5 / 4) * Math.abs(plan.proteins - fact.proteins)) / plan.proteins +
      ((5 / 4) * Math.abs(plan.carb - fact.carb)) / plan.carb +
      ((5 / 4) * Math.abs(plan.fats - fact.fats)) / plan.fats)
  );
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
  plan: TDietStat;
  foodRows: Food[];
  currentDay: number;
}

export const DietStats: FC<Props> = ({ plan, foodRows, currentDay }) => {
  const dispatch = useAppDispatch();

  const fact = foodRows
    .map((it) => {
      const w =
        it.days
          .find((day) => day.day === currentDay)
          ?.meals.reduce((acc, current) => acc + current.volume, 0) ?? 0;
      const m = w / 100;
      return {
        cal: m * it.stat.cal,
        proteins: m * it.stat.proteins,
        fats: m * it.stat.fats,
        carb: m * it.stat.carb,
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
    dispatch(dietActions.setDietDayRating({ day: currentDay, rating }));
  }, [rating]);

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
