import React, { FC } from 'react';

import { Outlet } from 'react-router-dom';

import { AppBar, Box, Container, Grid, Toolbar } from '@mui/material';

import styles from './layout.module.scss';
import { BrandLink } from './layout.ui';

export const GuestLayout: FC = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }} className={styles.header}>
        <AppBar position='static'>
          <Toolbar className={styles.toolbar}>
            <BrandLink />
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth='xl' fixed>
        <Grid container spacing={2} className={styles.main}>
          <Grid item md={12} width='100%' style={{ minHeight: 'calc(100vh - 70px)' }}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
