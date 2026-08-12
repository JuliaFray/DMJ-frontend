import React from 'react';

import { Outlet } from 'react-router-dom';

import { AppShell, Box, Burger, Container, Grid, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { MenuWidget } from 'widgets/menu-widget';

import { ProfileContext } from 'shared/context';
import { ScrollToTop } from 'shared/ui';

import { BrandLink, SignInLink, SignOutLink } from './layout.ui';

export const UserLayout = () => {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <ProfileContext.Consumer>
      {({ isAuth }) => (
        <Box>
          <AppShell
            header={{ height: 60 }}
            padding='md'
            navbar={{
              width: 300,
              breakpoint: 'sm',
              collapsed: { mobile: !opened },
            }}
          >
            {/* 1. Header Container */}
            <AppShell.Header>
              <Group h='100%' px='md' justify='space-between'>
                <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
                <BrandLink />
                {isAuth ? <SignOutLink /> : <SignInLink />}
              </Group>
            </AppShell.Header>

            {/* 2. Navbar area */}
            <AppShell.Navbar>
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
          </AppShell>
        </Box>
      )}
    </ProfileContext.Consumer>
  );
};
