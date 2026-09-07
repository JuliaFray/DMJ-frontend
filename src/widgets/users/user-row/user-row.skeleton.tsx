import React from 'react';

import { Paper, Skeleton, Stack } from '@mantine/core';

export const UserRowSkeleton: React.FC = () => {
  return (
    <Paper withBorder radius='md' p='md'>
      <Stack mb='md' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Skeleton height={50} mt={6} circle />
        <Stack mb='md' style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Skeleton height={8} mt={6} width='70%' radius='xl' />
          <Skeleton height={8} mt={6} width='70%' radius='xl' />
        </Stack>
      </Stack>
    </Paper>
  );
};
