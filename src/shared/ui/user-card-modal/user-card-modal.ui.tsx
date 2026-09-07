import React, { FC, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Card, Group, LoadingOverlay, Text } from '@mantine/core';

import { useGetUserStatsByIdQuery } from 'shared/api';

import { AvatarWithIndicator } from '..';
import { useAuth } from '../../context';
import { useAppDispatch } from '../../hook';
import { pathKeys } from '../../lib';
import { toggleFollowProfile } from '../../model';
import { IUser } from '../../types';

import classes from './user-card-modal.module.scss';

const statLabels = [{ label: 'Подписчики' }, { label: 'Подписки' }, { label: 'Посты' }];

interface UserCardTooltipProps {
  user: IUser;
  close: () => void;
}

export const UserCardModal: FC<UserCardTooltipProps> = ({ user, close }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { authId } = useAuth();

  const {
    data: stats,
    isFetching: isLoadingStats,
    refetch: refetchStats,
  } = useGetUserStatsByIdQuery({ userId: user._id }, { refetchOnMountOrArgChange: true });

  const userStats = [stats?.followersCount || 0, stats?.folowsCount || 0, stats?.postCount || 0];

  const items = statLabels.map((stat, index) => (
    <div key={stat.label}>
      <Text ta='center' fz='lg' fw={500}>
        {userStats[index]}
      </Text>
      <Text ta='center' fz='sm' c='dimmed' lh={1}>
        {stat.label}
      </Text>
    </div>
  ));

  const handleUserRedirect = () => {
    close();
    navigate(pathKeys.user.byId({ id: user._id }));
  };
  const [isFollowed, setIsFollowed] = useState(stats?.isFollowed || false);

  useEffect(() => {
    if (stats) {
      setIsFollowed(stats.isFollowed);
    }
  }, [stats]);

  const handleFollowClick = () => {
    setIsFollowed(!isFollowed);
    if (authId) {
      dispatch(
        toggleFollowProfile({
          profileId: authId,
          query: `?userId=${user._id}&isFollow=${!isFollowed}`,
          userId: user._id,
        }),
      );
      refetchStats();
    }
  };

  // const onSubmit = (event: React.FormEvent<HTMLFormElement>, u: IUser) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const formJson = Object.fromEntries(formData.entries());
  //
  //   const msg = {
  //     type: SocketEvents.MSG_EVENT,
  //     from: authId,
  //     to: u._id,
  //     text: formJson.text,
  //     dialogId: null,
  //   };
  //   ws?.send(JSON.stringify({ type: SocketEvents.MSG_EVENT, msg }));
  //
  //   handleClose();
  // };

  const isNotMe = authId !== user._id;

  return (
    <Card withBorder padding='xl' radius='md' className={classes.card}>
      <LoadingOverlay
        visible={isLoadingStats}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'teal', type: 'bars' }}
      />

      <AvatarWithIndicator
        avatarId={user.avatarId}
        profileId={user._id}
        styles={{
          border: '2px solid var(--mantine-color-body)',
          width: 'fit-content',
          margin: '0 auto',
        }}
      />

      <Text ta='center' fz='lg' fw={500} mt='sm'>
        {user.login}
      </Text>
      <Text ta='center' fz='sm' c='dimmed'>
        {user.email}
      </Text>
      <Group mt='md' justify='center' gap={30}>
        {items}
      </Group>
      {isNotMe && (
        <Group wrap='nowrap' justify='center'>
          <Button fullWidth radius='md' mt='xl' size='md' variant='default'>
            Сообщение
          </Button>

          <Button
            onClick={handleFollowClick}
            fullWidth
            radius='md'
            mt='xl'
            size='md'
            variant='default'
          >
            {isFollowed ? 'Отписаться' : 'Подписаться'}
          </Button>
        </Group>
      )}

      <Button
        onClick={handleUserRedirect}
        fullWidth
        radius='md'
        mt='xl'
        size='md'
        variant='default'
      >
        Открыть
      </Button>
    </Card>
  );
};

//       <Dialog
//         open={open}
//         fullWidth
//         onClose={handleClose}
//         PaperProps={{
//           component: 'form',
//           onSubmit: (event: React.FormEvent<HTMLFormElement>) => onSubmit(event, user),
//         }}
//       >
//         <DialogTitle>Отправить сообщение</DialogTitle>
//         <DialogContent>
//           <DialogContentText>Кому: {getFullName(user)}</DialogContentText>
//           <TextField
//             autoFocus
//             required
//             margin='dense'
//             id='name'
//             name='text'
//             placeholder='Введите сообщение...'
//             type='text'
//             fullWidth
//             variant='outlined'
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Отмена</Button>
//           <Button variant='contained' type='submit'>
//             Отправить
//           </Button>
//         </DialogActions>
//       </Dialog>
