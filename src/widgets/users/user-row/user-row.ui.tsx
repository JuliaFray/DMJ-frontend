import React, { useCallback, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { Chat, Loyalty } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { useWebSocket } from 'shared/context';
import { useAppDispatch, useAppSelector } from 'shared/hook';
import { getFullName, NO_AVATAR, pathKeys, SocketEvents } from 'shared/lib';
import { appActions, appSelector, authSelector } from 'shared/model';
import { IUser } from 'shared/types';

import styles from './user-row.module.scss';

type TUSerRow = {
  user: IUser;
  toggleFollow: (userId: string, isFollow: boolean) => void;
};

export const UserRow: React.FC<TUSerRow> = ({ user, toggleFollow }) => {
  const ws = useWebSocket();
  const authId = useAppSelector(authSelector.getAuthId);
  const [isFollowed, setIsFollowed] = useState(user.isFollowed);
  const [open, setOpen] = React.useState(false);

  const image = (user.avatar && `data:image/jpeg;base64,${user.avatar?.data}`) || NO_AVATAR;

  const dispatch = useAppDispatch();

  const handleWS = useCallback(
    (e: MessageEvent<string>) => {
      const { type, data } = JSON.parse(e.data);
      if (type === SocketEvents.LOGOUT_EVENT) {
        dispatch(
          appActions.setUsersOnline({
            type: 'app/setUserOnline',
            payload: data,
          }),
        );
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (!ws) return;

    ws.addEventListener('message', handleWS);
    return () => {
      ws.removeEventListener('message', handleWS);
    };
  }, [handleWS, ws]);

  const handleMessageClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFollowClick = () => {
    setIsFollowed((prevState) => !prevState);
    toggleFollow(user._id, !isFollowed);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>, u: IUser) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    const msg = {
      type: SocketEvents.MSG_EVENT,
      from: authId,
      to: u._id,
      text: formJson.text,
      dialogId: null,
    };
    ws?.send(JSON.stringify({ type: SocketEvents.MSG_EVENT, msg }));

    handleClose();
  };
  const users = useAppSelector(appSelector.getAppUserOnline);
  const isOnline = users.includes(user._id);

  return (
    <Card className={styles.userRow} raised>
      <Container
        className={
          isOnline
            ? `${styles.profileHeader} ${styles.on}`
            : `${styles.profileHeader} ${styles.off}`
        }
      >
        <Avatar variant='circular' className={styles.avatar} src={image} alt={user.login} />
      </Container>

      <Container className={styles.rowContent}>
        <div className={styles.userInfo}>
          <CardContent>
            <Typography component='div' variant='h5'>
              <Link to={pathKeys.user.byId({ id: user._id })}>{getFullName(user)}</Link>
            </Typography>
          </CardContent>
        </div>
      </Container>

      <Box className={styles.actions}>
        {isFollowed ? (
          <Tooltip title='Отписаться'>
            <Button
              className={styles.btn}
              onClick={handleFollowClick}
              size='medium'
              variant='contained'
              startIcon={<Loyalty />}
            >
              <span className={styles.btnText}>Отписаться</span>
            </Button>
          </Tooltip>
        ) : (
          <Tooltip title='Подписаться'>
            <Button
              className={styles.btn}
              onClick={handleFollowClick}
              size='medium'
              variant='outlined'
              startIcon={<Loyalty />}
            >
              <span className={styles.btnText}>Подписаться</span>
            </Button>
          </Tooltip>
        )}

        <Tooltip title='Написать'>
          <Button
            className={styles.btn}
            onClick={handleMessageClick}
            size='medium'
            variant='outlined'
            startIcon={<Chat />}
          >
            <span className={styles.btnText}>Написать</span>
          </Button>
        </Tooltip>

        <Dialog
          open={open}
          fullWidth
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => onSubmit(event, user),
          }}
        >
          <DialogTitle>Отправить сообщение</DialogTitle>
          <DialogContent>
            <DialogContentText>Кому: {getFullName(user)}</DialogContentText>
            <TextField
              autoFocus
              required
              margin='dense'
              id='name'
              name='text'
              placeholder='Введите сообщение...'
              type='text'
              fullWidth
              variant='outlined'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button variant='contained' type='submit'>
              Отправить
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Card>
  );
};
