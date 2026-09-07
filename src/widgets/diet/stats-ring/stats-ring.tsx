import React, { FC } from 'react';

import { ArrowDownRightIcon, ArrowUpRightIcon } from '@phosphor-icons/react';

import { Center, Group, Paper, RingProgress, Text } from '@mantine/core';

import { IDietRingStat, Nullable } from 'shared/types';

const icons = {
  up: ArrowUpRightIcon,
  down: ArrowDownRightIcon,
};

export const StatsRing: FC<IDietRingStat> = ({ label, stat, progress, color, icon }) => {
  let labelIcon: Nullable<JSX.Element> = null;
  if (icon) {
    const Icon = icons[icon];

    labelIcon = (
      <Center>
        <Icon size={20} stroke={1.5} />
      </Center>
    );
  }
  return (
    <Paper withBorder radius='md' p='xs' key={label}>
      <Group>
        <RingProgress
          size={80}
          roundCaps
          thickness={8}
          sections={[{ value: progress, color }]}
          label={labelIcon}
        />

        <div>
          <Text c='dimmed' size='xs' tt='uppercase' fw={700}>
            {label}
          </Text>
          <Text fw={700} size='xl'>
            {stat}
          </Text>
        </div>
      </Group>
    </Paper>
  );
};
