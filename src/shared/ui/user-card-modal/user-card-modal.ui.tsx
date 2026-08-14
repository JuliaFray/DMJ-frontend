import React, { FC, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Avatar, Button, Card, Group, Text } from '@mantine/core';

import { useAuth } from 'shared/context';
import { useAppDispatch } from 'shared/hook';
import { toggleFollowProfile } from 'shared/model';
import { getAvatarSrc } from 'shared/utils';

import { pathKeys } from '../../lib';
import { IUser } from '../../types';

import classes from './user-card-modal.module.css';

const stats = [{ label: 'Followers' }, { label: 'Follows' }, { label: 'Posts' }];

interface UserCardTooltipProps {
  user: IUser;
}

export const UserCardModal: FC<UserCardTooltipProps> = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { authId } = useAuth();

  const userStats = [
    user.stats?.followersCount || 0,
    user.stats?.folowsCount || 0,
    user.stats?.postCount || 0,
  ];

  const items = stats.map((stat, index) => (
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
    navigate(pathKeys.user.byId({ id: user._id }));
  };
  const [isFollowed, setIsFollowed] = useState(user.isFollowed);

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
    }
  };

  return (
    <Card withBorder padding='xl' radius='md' className={classes.card}>
      <Card.Section
        h={140}
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
        }}
      />

      <Avatar
        src={getAvatarSrc(user.avatarId)}
        size={80}
        radius={80}
        mx='auto'
        mt={-30}
        className={classes.avatar}
        alt={user.login}
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
      <Group wrap='nowrap' justify='center'>
        <Button fullWidth radius='md' mt='xl' size='md' variant='default'>
          Message
        </Button>
        <Button
          onClick={handleFollowClick}
          fullWidth
          radius='md'
          mt='xl'
          size='md'
          variant='default'
        >
          Follow
        </Button>
      </Group>
      <Button
        onClick={handleUserRedirect}
        fullWidth
        radius='md'
        mt='xl'
        size='md'
        variant='default'
      >
        Open
      </Button>
    </Card>
  );
};
