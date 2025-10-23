import React, { FC, useContext } from 'react';

import { NavLink } from 'react-router-dom';

import { Logout } from '@mui/icons-material';
import Login from '@mui/icons-material/Login';
import { Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { ProfileContext } from 'shared/context';
import { useAppDispatch, useWebSocket } from 'shared/hook';
import { pathKeys, SocketEvents } from 'shared/lib';
import { appActions, authActions } from 'shared/model';
import { theme } from 'shared/themes';

import styles from './layout.module.scss';

export const BrandLink = () => {
  return (
    <NavLink className={styles.brandlink} to={pathKeys.home()}>
      <Typography
        variant='h6'
        component='div'
        sx={{ flexGrow: 1 }}
        color={theme.palette.primary.contrastText}
      >
        <IconButton>
          <img alt='logo' style={{ height: '40px' }} src={`${process.env.PUBLIC_URL}/logo.png`} />
        </IconButton>
        <span style={{ verticalAlign: 'middle' }}>HEALTH BALANCE</span>
      </Typography>
    </NavLink>
  );
};

export const SignInLink: FC = () => {
  return (
    <NavLink className={styles.sign} to={pathKeys.login()}>
      <Tooltip title='Войти'>
        <Login sx={{ color: theme.palette.primary.contrastText }} />
      </Tooltip>
    </NavLink>
  );
};

export const SignOutLink: FC = () => {
  const { authId } = useContext(ProfileContext);

  const dispatch = useAppDispatch();

  const ws = useWebSocket();

  const handleLogout = () => {
    ws?.send(JSON.stringify({ type: SocketEvents.LOGOUT_EVENT, id: authId }));
    dispatch(authActions.logout());
    dispatch(appActions.setUninitialized());
  };

  return (
    <Tooltip title='Выйти'>
      <IconButton onClick={handleLogout} className={styles.sign}>
        <Logout sx={{ color: theme.palette.primary.contrastText }} />
      </IconButton>
    </Tooltip>
  );
};
