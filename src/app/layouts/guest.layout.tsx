import React, { FC } from 'react';

import { Outlet } from 'react-router-dom';

import { AppShell, Box, Container, Grid } from '@mantine/core';

import { useLastLocation } from 'shared/hook';

export const GuestLayout: FC = () => {
  useLastLocation();
  return (
    <Box>
      <AppShell padding='md'>
        {/* 1. Main content area */}
        <AppShell.Main>
          <Container strategy='grid'>
            <Grid>
              <Grid.Col span={12}>
                <Outlet />
              </Grid.Col>
            </Grid>
          </Container>
        </AppShell.Main>
      </AppShell>
    </Box>
  );
};
