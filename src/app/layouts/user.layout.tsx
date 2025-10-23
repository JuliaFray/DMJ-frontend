import React from 'react';

import { Outlet } from 'react-router-dom';

import { AppBar, Box, Container, Grid, Toolbar } from '@mui/material';

import { MenuWidget } from 'widgets/menu-widget';

import { ProfileContext } from 'shared/context';
import { ScrollToTop } from 'shared/ui';

import styles from './layout.module.scss';
import { BrandLink, SignInLink, SignOutLink } from './layout.ui';

export function UserLayout() {
  return (
    <ProfileContext.Consumer>
      {({ isAuth }) => (
        <Box display='flex'>
          <AppBar
            position='fixed'
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            className={styles.header}
          >
            <Toolbar className={styles.toolbar}>
              <BrandLink />
              {isAuth ? <SignOutLink /> : <SignInLink />}
            </Toolbar>
          </AppBar>

          <Container fixed maxWidth='xl' sx={{ flexGrow: 1, marginTop: '80px' }}>
            <Grid container spacing={2} className={styles.main}>
              <Grid item md={3} className={styles.left}>
                <MenuWidget />
              </Grid>

              <Grid item md={9} width='100%' style={{ minHeight: 'calc(100vh - 70px)' }}>
                <Outlet />
              </Grid>
            </Grid>
            <ScrollToTop />
          </Container>
        </Box>
      )}
    </ProfileContext.Consumer>
  );
}
