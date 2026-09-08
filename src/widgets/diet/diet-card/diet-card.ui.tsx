import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Card, Group, Rating, SimpleGrid, Title } from '@mantine/core';

import { pathKeys } from 'shared/lib';
import { IDietPlan } from 'shared/types';

import { StatsRing } from '../stats-ring';

import { calculateStats } from './diet-card.utils';

type TDietCard = {
  diet: IDietPlan;
};

export const DietCard: React.FC<TDietCard> = ({ diet }) => {
  const navigate = useNavigate();

  const statData = calculateStats(diet.userId.config.targets.targetStat, diet.statResult);

  return (
    <Card withBorder padding='lg' radius='md'>
      <Group mb='md' justify='space-between'>
        <Title
          order={5}
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(pathKeys.planner.byId({ id: diet._id }))}
        >
          {diet.name}
        </Title>
        <Rating value={diet.statResult.planRating} fractions={2} readOnly color='teal' />
      </Group>

      <SimpleGrid cols={{ base: 2, sm: 4 }}>
        {statData.map((it) => (
          <StatsRing
            label={it.label}
            stat={it.stat}
            progress={it.progress}
            color={it.color}
            icon={it.icon}
          />
        ))}
      </SimpleGrid>
    </Card>
  );
};
