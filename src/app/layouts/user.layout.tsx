import React from 'react';

import { MoonStarsIcon, SunIcon } from '@phosphor-icons/react';
import { Outlet } from 'react-router-dom';

import {
  AppShell,
  Box,
  Burger,
  Container,
  Grid,
  Group,
  Switch,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

import { MenuWidget } from 'widgets/menu-widget';

import { ScrollToTop } from 'shared/ui';

import classes from './layout.module.scss';
import { BrandLink, SignOutLink } from './layout.ui';

export const UserLayout = () => {
  const [opened, { toggle, close }] = useDisclosure();
  const matches = useMediaQuery('(min-width: 48em)');
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <Box>
      <AppShell
        zIndex={300}
        header={{ height: 64 }}
        padding='md'
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
      >
        {/* 1. Header Container */}
        <AppShell.Header className={classes.header}>
          <Group h='100%' px='md' justify='space-between'>
            <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' color='white' />
            <BrandLink />

            <Switch
              size='md'
              color='dark.4'
              onLabel={
                <SunIcon
                  style={{ cursor: 'pointer' }}
                  size={16}
                  color='var(--mantine-color-yellow-4)'
                />
              }
              offLabel={
                <MoonStarsIcon
                  style={{ cursor: 'pointer' }}
                  size={16}
                  color='var(--mantine-color-teal-6)'
                />
              }
              onClick={toggleColorScheme}
            />

            <SignOutLink />
          </Group>
        </AppShell.Header>

        {/* 2. Navbar area */}
        <AppShell.Navbar className={`${classes.navbar}${matches ? '' : '-mobile'}`}>
          <MenuWidget close={close} />
        </AppShell.Navbar>

        {/* 3. Main content area */}
        <AppShell.Main>
          <Container strategy='grid' size='90%'>
            <Grid>
              <Grid.Col span={12}>
                <Outlet />
              </Grid.Col>
            </Grid>
            <ScrollToTop />
          </Container>
        </AppShell.Main>

        {/* <AppShell.Footer>footer</AppShell.Footer> */}
      </AppShell>
    </Box>
  );
};
