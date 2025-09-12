import React from 'react';

import { NavLink } from 'react-router-dom';

import { Logout } from '@mui/icons-material';
import Login from '@mui/icons-material/Login';
import { Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { useAppDispatch, useAppSelector, useWebSocket } from 'shared/hook';
import { pathKeys, SocketEvents } from 'shared/lib';
import { appActions, authActions, getAuthId } from 'shared/model';

import styles from './layout.module.scss';

export function BrandLink() {
  return (
    <NavLink className={styles.header} to={pathKeys.home()}>
      <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
        <IconButton>
          <img alt='logo' style={{ height: '40px' }} src={`${window.location.origin}/logo.png`} />
        </IconButton>
        HealthBalance
      </Typography>
    </NavLink>
  );
}

export function SignInLink() {
  return (
    <NavLink to={pathKeys.login()}>
      <Tooltip title='Войти'>
        <Login />
      </Tooltip>
    </NavLink>
  );
}

export function SignOutLink() {
  const dispatch = useAppDispatch();
  const authId = useAppSelector(getAuthId);

  const ws = useWebSocket();

  const handleLogout = () => {
    ws?.send(JSON.stringify({ type: SocketEvents.LOGOUT_EVENT, id: authId }));
    dispatch(authActions.logout());
    dispatch(appActions.setUninitialized());
  };

  return (
    <Tooltip title='Выйти'>
      <IconButton onClick={handleLogout}>
        <Logout color='success' />
      </IconButton>
    </Tooltip>
  );
}
