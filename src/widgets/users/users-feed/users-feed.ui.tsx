import React, { Dispatch, SetStateAction, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Grid } from '@mantine/core';

import { UserRow, UserRowSkeleton } from 'widgets/users';

import { useLazyGetAllUsersQuery } from 'shared/api';
import { useAppDispatch, useAppSelector } from 'shared/hook';
import { authSelector, toggleFollowProfile, usersSelector } from 'shared/model';
import { IUser } from 'shared/types';

type IUsersMain = {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  isFollowers: boolean;
};

export const UsersFeed: React.FC<IUsersMain> = ({ currentPage, isFollowers }) => {
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

  const toggleFollow = (userId: string, isFollow: boolean) => {
    if (profileId) {
      dispatch(
        toggleFollowProfile({
          profileId,
          query: `?userId=${userId}&isFollow=${isFollow}`,
          userId,
        }),
      );
    }
  };

  return (
    <Grid style={{ marginBottom: '30px' }}>
      {isFetching
        ? [...Array(5)].map(() => (
            <Grid.Col key={uuidv4()}>
              <UserRowSkeleton />
            </Grid.Col>
          ))
        : users.map((u: IUser) => (
            <Grid.Col key={u._id}>
              <UserRow user={u} key={u._id} toggleFollow={toggleFollow} />
            </Grid.Col>
          ))}
    </Grid>
  );
};
