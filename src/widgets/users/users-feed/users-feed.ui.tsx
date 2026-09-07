import React, { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Button, Grid } from '@mantine/core';

import { UserRowSkeleton } from 'widgets/users';

import { useLazyGetAllUsersQuery } from 'shared/api';
import { useAuth } from 'shared/context';
import { useAppDispatch, useAppSelector } from 'shared/hook';
import { authSelector, toggleFollowProfile, usersSelector } from 'shared/model';
import { IUser } from 'shared/types';
import { UserButton } from 'shared/ui';

type IUsersMain = {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  isFollowers: boolean;
};

export const UsersFeed: React.FC<IUsersMain> = ({ currentPage, isFollowers }) => {
  const { authId } = useAuth();

  const users = useAppSelector(usersSelector.getUsers);
  const isFetching = useAppSelector(usersSelector.getIsFetching);
  const profileId = useAppSelector(authSelector.getAuthId);

  const dispatch = useAppDispatch();

  const params = useParams();

  const [triggerGetAllUsers] = useLazyGetAllUsersQuery();

  useEffect(() => {
    triggerGetAllUsers({
      currentPage,
      isFollowers,
      userId: params.id || profileId || '',
    });
  }, [dispatch, currentPage, isFollowers, triggerGetAllUsers, params.id, profileId]);

  const handleFollowClick = (user: IUser) => {
    if (authId) {
      dispatch(
        toggleFollowProfile({
          profileId: authId,
          query: `?userId=${user._id}&isFollow=${!user.isFollowed}`,
          userId: user._id,
        }),
      );
    }
  };

  const customActions = (user: IUser): ReactNode => {
    return (
      <Button
        onClick={() => handleFollowClick(user)}
        radius='md'
        size='md'
        variant={user.isFollowed ? 'default' : 'filled'}
      >
        {user.isFollowed ? 'Отписаться' : 'Подписаться'}
      </Button>
    );
  };

  return (
    <Grid mb={30}>
      {isFetching
        ? [...Array(5)].map(() => (
            <Grid.Col key={uuidv4()}>
              <UserRowSkeleton />
            </Grid.Col>
          ))
        : users.map((u: IUser) => (
            <Grid.Col key={u._id} mb={10}>
              <UserButton user={u} key={u._id} customActions={customActions(u)} />
            </Grid.Col>
          ))}
    </Grid>
  );
};
