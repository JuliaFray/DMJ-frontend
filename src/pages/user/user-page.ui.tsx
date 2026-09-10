import React from 'react';

import { useParams } from 'react-router-dom';

import { Grid, LoadingOverlay, Box } from '@mantine/core';

import { UserCard, ProfileTabs } from 'widgets/users';

import { useGetUserByIdQuery, useGetUserStatsByIdQuery } from 'shared/api';
import { useMedia } from 'shared/hook';

import styles from './user-page.module.scss';

export const UserPage: React.FC = React.memo(() => {
  const { mdMain, mdSide } = useMedia();
  const params = useParams();

  const userId: string = params.id || '';
  const { data: profile, isLoading: isLoadingProfile } = useGetUserByIdQuery({ userId });
  const { data: stats, isLoading: isLoadingStats } = useGetUserStatsByIdQuery({ userId });

  if (!profile || !profile.data) {
    return null;
  }

  return (
    <Grid>
      <Grid.Col span={mdMain}>
        <Box pos='relative'>
          <LoadingOverlay
            visible={isLoadingProfile || isLoadingStats}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'teal', type: 'bars' }}
          />
          <UserCard profile={profile.data} />
        </Box>

        <ProfileTabs userId={userId} />
      </Grid.Col>

      <Grid.Col span={mdSide} className={styles.right} />
    </Grid>
  );
});
