import React from 'react';

import { Link } from 'react-router-dom';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';

import { pathKeys } from 'shared/lib';
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
          <Link className={styles.title} to={pathKeys.planner.byId({ id: diet._id })}>
            {diet.name}
          </Link>
        }
        action={
          <Link to={pathKeys.planner.byId({ id: diet._id })}>
            <Tooltip title='Открыть план'>
              <IconButton aria-label='forward'>
                <ChevronRightIcon />
              </IconButton>
            </Tooltip>
          </Link>
        }
      />

      <CardContent style={{ height: '220px' }}>
        <DietStats
          plan={diet.author.healthInfo.plan}
          fact={diet.stat}
          period={diet.period}
          rating={diet.stat.rating}
        />
      </CardContent>
    </Card>
  );
};
