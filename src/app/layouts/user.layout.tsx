import React from 'react';

import { Outlet } from 'react-router-dom';

import { AppBar, Box, Container, Grid, Toolbar } from '@mui/material';

import { MenuWidget } from 'widgets/menu-widget';

import { useAppSelector } from 'shared/hook';
import { getAuthId } from 'shared/model';

import styles from './layout.module.scss';
import { BrandLink, SignInLink, SignOutLink } from './layout.ui';

export function UserLayout() {
  const userId = useAppSelector(getAuthId);

  return (
    <>
      <Box sx={{ flexGrow: 1 }} className={styles.header}>
        <AppBar position='static'>
          <Toolbar className={styles.toolbar}>
            <BrandLink />
            {userId ? <SignOutLink /> : <SignInLink />}
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth='xl' fixed>
        <Grid container spacing={2} className={styles.main}>
          <Grid item md={3} className={styles.left}>
            <MenuWidget userId={userId} />
          </Grid>

          <Grid item md={9} width='100%' style={{ minHeight: 'calc(100vh - 70px)' }}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
