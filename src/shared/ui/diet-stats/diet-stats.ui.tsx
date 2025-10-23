import React from 'react';

import { Row } from 'rsuite';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Grid, Rating, styled } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

import { theme } from 'shared/themes';
import { StyledRating } from 'shared/ui';

import { TDietStat } from '../../types';

import styles from './diet-stats.module.scss';

type DietStatsProps = {
  plan: TDietStat;
  period: number;
  rating: number;
  fact: TDietStat;
};

export const DietStats: React.FC<DietStatsProps> = ({ period, plan, fact, rating }) => {
  const percent = (fact.fats + fact.proteins + fact.carb) / (plan.carb + plan.fats + plan.proteins);

  return (
    <Grid
      container
      width='auto !important'
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      className={styles.stats}
    >
      <Grid item md={4} className={styles.stat}>
        <Row className={styles.period}>{period} дней</Row>
        <Row>
          <StyledRating
            emptyIcon={<FavoriteBorderIcon />}
            icon={<FavoriteIcon />}
            value={Number(rating) / 20}
            precision={0.1}
            readOnly
          />
        </Row>
      </Grid>

      <Grid item md={8} className={styles.container}>
        <PieChart
          width={360}
          height={200}
          series={[
            {
              data: [
                {
                  id: 1,
                  value: fact.proteins,
                  label: 'Белки',
                  color: theme.palette.secondary.main,
                },
                { id: 3, value: fact.fats, label: 'Жиры', color: theme.palette.error.main },
                { id: 5, value: fact.carb, label: 'Углеводы', color: theme.palette.warning.main },
              ],
              innerRadius: 60,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: 360 - percent * 360,
              endAngle: 360,
              cx: 120,
              cy: '50%',
            },
          ]}
        />
      </Grid>
    </Grid>
  );
};
