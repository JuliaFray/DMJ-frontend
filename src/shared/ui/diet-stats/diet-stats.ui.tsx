import React from 'react';

import { Row } from 'rsuite';

import { Grid } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

import { theme } from '../../themes';
import { Nutrients } from '../../types';
import { StyledRating } from '../styled-rating.ui';

import styles from './diet-stats.module.scss';

type DietStatsProps = {
  plan?: Nutrients;
  period: number;
  rating: number;
  fact?: Nutrients;
};

export const DietStats: React.FC<DietStatsProps> = ({ period, plan, fact, rating }) => {
  const percent =
    fact && plan
      ? (fact.fats + fact.proteins + fact.carbs) / (plan.carbs + plan.fats + plan.proteins)
      : 0;

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
          <StyledRating value={rating} />
        </Row>
      </Grid>

      {fact && (
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
                  {
                    id: 5,
                    value: fact.carbs,
                    label: 'Углеводы',
                    color: theme.palette.warning.main,
                  },
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
      )}
    </Grid>
  );
};
