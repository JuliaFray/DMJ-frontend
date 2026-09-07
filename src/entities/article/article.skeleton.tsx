import React, { FC } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { Skeleton, Paper, Stack } from '@mantine/core';

export const ArticleSkeleton: FC = () => {
  return (
    <Paper key={uuidv4()} withBorder radius='md' p='md' mb='md'>
      <Skeleton height={8} radius='xl' />
      <Skeleton height={8} mt={6} width='70%' radius='xl' mb='md' />
      <Stack mb='md' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Skeleton height={50} mt={6} circle />
        <Skeleton height={8} mt={6} width='70%' radius='xl' />
      </Stack>

      <Skeleton height={8} mt={6} radius='xl' />
    </Paper>
  );
};
