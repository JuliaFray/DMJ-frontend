import React from 'react';

import { Row } from 'rsuite';

import { Grid } from '@mui/material';

import { TDietStat } from '../../types';

import styles from './diet-stats.module.scss';

type DietStatsProps = {
  plan: TDietStat;
  period: number;
  rating: number;
};

export const DietStats: React.FC<DietStatsProps> = ({ period, plan, rating }) => {
  return (
    <Grid
      container
      width='auto !important'
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      className={styles.stats}
    >
      <Grid item md={6}>
        <Row className={styles.statRow__vertical}>
          Длительность
          <div className={styles.statItem}>{period} дней</div>
        </Row>
        <Row className={styles.statRow__vertical}>
          Средняя калорийность
          <div className={styles.statItem}>{plan.cal} ккал</div>
        </Row>
      </Grid>
      <Grid item md={6}>
        <Row className={styles.statRow}>
          <div style={{ width: '50%' }}>Белки</div>
          <div className={styles.statItem}>{plan.proteins} г</div>
        </Row>
        <Row className={styles.statRow}>
          <div style={{ width: '50%' }}>Жиры</div>
          <div className={styles.statItem}>{plan.fats} г</div>
        </Row>
        <Row className={styles.statRow}>
          <div style={{ width: '50%' }}>Углеводы</div>
          <div className={styles.statItem}>{plan.carb} г</div>
        </Row>
        <Row className={styles.statRow}>
          <div style={{ width: '50%' }}>Рейтинг</div>
          <div className={styles.statItem}>{rating} %</div>
        </Row>
      </Grid>
    </Grid>
  );
};
