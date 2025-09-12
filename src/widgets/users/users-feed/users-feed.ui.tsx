import React, { Dispatch, SetStateAction, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Grid } from '@mui/material';

import { useLazyGetAllUsersQuery } from 'shared/api';
import { useAppDispatch } from 'shared/hook';
import { getAuthId, getIsFetching, getUsers, toggleFollowProfile } from 'shared/model';
import { TUser } from 'shared/types';

import { UserRow, UserRowSkeleton } from 'widgets';

type IUsersMain = {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  isFollowers: boolean;
};

export const UsersFeed: React.FC<IUsersMain> = ({ currentPage, isFollowers }) => {
  const users = useSelector(getUsers);
  const isFetching = useSelector(getIsFetching);
  const profileId = useSelector(getAuthId);

  const dispatch = useAppDispatch();

  const params = useParams();

  const [triggerGetAllUsers] = useLazyGetAllUsersQuery();

  useEffect(() => {
    triggerGetAllUsers({
      currentPage,
      isFollowers,
      userId: params.id || profileId,
    });
  }, [dispatch, currentPage, isFollowers]);

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
    <div style={{ position: 'relative', margin: 0, padding: 0 }}>
      <Grid
        container
        sx={{ margin: 0, padding: 0 }}
        rowSpacing={{ xs: 1, sm: 2, md: 3 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        style={{ marginBottom: '30px' }}
      >
        {isFetching
          ? [...Array(5)].map(() => (
              <Grid item xs={6} key={uuidv4()}>
                <UserRowSkeleton />
              </Grid>
            ))
          : users.map((u: TUser) => (
              <Grid item xs={6} key={u._id}>
                <UserRow user={u} key={u._id} toggleFollow={toggleFollow} />
              </Grid>
            ))}
      </Grid>
    </div>
  );
};
