import React from 'react';

import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

import { TDietPlan } from 'shared/types';
import { DietStats } from 'shared/ui';

import styles from './diet-card.module.scss';

type TDietCard = {
  diet: TDietPlan;
};
export const DietCard: React.FC<TDietCard> = ({ diet }) => {
  return (
    <Card>
      <CardHeader
        sx={{
          height: '20%',
          '& .MuiTypography-subtitle1': {
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
          },
        }}
        title={
          <Link className={styles.title} to={`/planner/${diet._id}`}>
            {diet.name}
          </Link>
        }
        titleTypographyProps={{
          variant: 'subtitle1',
          whiteSpace: 'normal',
        }}
      />

      <CardContent>
        <DietStats plan={diet.stats.plan} period={diet.period} rating={diet.stats.rating} />
      </CardContent>

      {/* <CardActions> */}
      {/*    actions */}
      {/* </CardActions> */}
    </Card>
  );
};
