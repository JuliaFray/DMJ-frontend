import React, { useState } from 'react';

import { Outlet } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import { Box, Container, Grid, IconButton, styled, Toolbar } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import { MenuWidget } from 'widgets/menu-widget';

import { ProfileContext } from 'shared/context';
import { ScrollToTop } from 'shared/ui';

import styles from './layout.module.scss';
import { BrandLink, SignInLink, SignOutLink } from './layout.ui';

const drawerWidth = 25;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: `min(${drawerWidth}%, 400px)`,
        width: `calc(100% - min(${drawerWidth}%, 400px))`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export const UserLayout = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <ProfileContext.Consumer>
      {({ isAuth }) => (
        <Box display='flex'>
          <AppBar
            open={open}
            position='fixed'
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            className={styles.header}
          >
            <Toolbar className={styles.toolbar}>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={handleDrawerOpen}
                edge='start'
                sx={[
                  {
                    marginRight: 5,
                  },
                  open && { display: 'none' },
                ]}
              >
                <MenuIcon />
              </IconButton>

              <BrandLink />
              {isAuth ? <SignOutLink /> : <SignInLink />}
            </Toolbar>
          </AppBar>

          <Container fixed maxWidth='xl' sx={{ flexGrow: 1, marginTop: '80px' }}>
            <Grid container spacing={2} className={styles.main}>
              <Grid item md={3} className={styles.left}>
                <MenuWidget open={open} setOpen={setOpen} />
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
};
