import React, { useCallback, useEffect, useState } from 'react';

import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Tooltip,
} from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

import { useWebSocket } from 'shared/context';
import { useAppDispatch, useAppSelector } from 'shared/hook';
import { getFullName, SocketEvents } from 'shared/lib';
import { appActions, appSelector, authSelector, toggleFollowProfile } from 'shared/model';
import { IUser } from 'shared/types';

import { ProfileData } from '../ProfileData';
import styles from '../ProfileInfo.module.scss';

type TProfileMain = {
  isOwner: boolean;
  profile: IUser;
};

export const ProfileCard: React.FC<TProfileMain> = ({ isOwner, profile }) => {
  const authId = useAppSelector(authSelector.getAuthId);
  const users = useAppSelector(appSelector.getAppUserOnline);

  const [status, setStatus] = useState(false);
  const [isFollowed, setIsFollowed] = useState(profile.isFollowed);
  const [open, setOpen] = React.useState(false);

  const ws = useWebSocket();
  const dispatch = useAppDispatch();

  const handleWS = useCallback(
    (e: MessageEvent<string>) => {
      const { type, data } = JSON.parse(e.data);
      if (type === SocketEvents.LOGOUT_EVENT) {
        setStatus(!data.includes(profile._id));
        dispatch(
          appActions.setUsersOnline({
            type: 'app/setUserOnline',
            payload: profile._id,
          }),
        );
      }
    },
    [dispatch, profile._id],
  );

  useEffect(() => {
    if (!ws) return;

    ws.addEventListener('message', handleWS);
    return () => ws.removeEventListener('message', handleWS);
  }, [handleWS, ws]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleFollowClick = () => {
    setIsFollowed(!isFollowed);
    if (authId) {
      dispatch(
        toggleFollowProfile({
          profileId: authId,
          query: `?userId=${profile._id}&isFollow=${!isFollowed}`,
          userId: profile._id,
        }),
      );
    }
  };

  const isOnline = status || users.includes(profile._id);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>, user: IUser) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    const msg = {
      type: SocketEvents.MSG_EVENT,
      from: authId,
      to: user._id,
      text: formJson.text,
      dialogId: null,
    };
    ws?.send(JSON.stringify({ type: SocketEvents.MSG_EVENT, msg }));

    handleClose();
  };

  return (
    <Card
      className={
        isOnline ? `${styles.profileCard} ${styles.on}` : `${styles.profileCard} ${styles.off}`
      }
    >
      <Container
        className={
          isOnline
            ? `${styles.profileHeader} ${styles.on}`
            : `${styles.profileHeader} ${styles.off}`
        }
      >
        <div className={styles.actions}>
          {!isOwner && !!authId && (
            <>
              {isFollowed ? (
                <Tooltip title='Отписаться'>
                  <Button
                    sx={{ mr: 1 }}
                    className={styles.buttons}
                    onClick={handleFollowClick}
                    size='small'
                    variant='contained'
                  >
                    <span>Отписаться</span>
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip title='Подписаться'>
                  <Button
                    sx={{ mr: 1 }}
                    className={styles.buttons}
                    onClick={handleFollowClick}
                    size='small'
                    variant='outlined'
                  >
                    <span>Подписаться</span>
                  </Button>
                </Tooltip>
              )}

              <Tooltip title='Написать'>
                <Button
                  className={styles.buttons}
                  onClick={() => setOpen(true)}
                  size='small'
                  variant='outlined'
                >
                  <span>Написать</span>
                </Button>
              </Tooltip>

              <Dialog
                open={open}
                fullWidth
                onClose={handleClose}
                PaperProps={{
                  component: 'form',
                  onSubmit: (event: React.FormEvent<HTMLFormElement>) => onSubmit(event, profile),
                }}
              >
                <DialogTitle>Отправить сообщение</DialogTitle>
                <DialogContent>
                  <DialogContentText>Кому: {getFullName(profile)}</DialogContentText>
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
            </>
          )}
        </div>
      </Container>

      <Container className={styles.profileInfo}>
        <ProfileData profile={profile} isOwner={isOwner} />
      </Container>
    </Card>
  );
};
