import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Grid, useMediaQuery } from '@mui/material';

import { ProfileCard, ProfileTabs } from 'widgets/profile';

import { useAppDispatch, useAppSelector } from 'shared/hook';
import { authSelector, getUserProfile, getUserProfileStats, profileSelector } from 'shared/model';
import { theme } from 'shared/themes';

import styles from './user-page.module.scss';

export const ProfilePage: React.FC = React.memo(() => {
  const isMore1200px = useMediaQuery(theme.breakpoints.up('lg'));

  const profile = useAppSelector(profileSelector.getProfile);
  const authorizeUserId = useAppSelector(authSelector.getAuthId);

  const params = useParams();
  const dispatch = useAppDispatch();

  const isOwner = params.id === authorizeUserId;
  const userId: string = params.id || authorizeUserId || profile?.userId || '';

  useEffect(() => {
    dispatch(getUserProfile({ userId }));
    dispatch(getUserProfileStats({ userId }));
  }, [userId]);

  return (
    <Grid container spacing={2} width='100%'>
      <Grid item md={isMore1200px ? 9 : 12} width='100%'>
        {!!profile && <ProfileCard isOwner={isOwner} profile={profile} />}
        {!!profile && <ProfileTabs isOwner={isOwner} userId={profile._id} />}
      </Grid>

      <Grid item md={3} className={styles.right} />
    </Grid>
  );
});
