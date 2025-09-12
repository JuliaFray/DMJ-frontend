import React, { useEffect } from 'react';

import { Grid, useMediaQuery } from '@mui/material';

import { useAppDispatch } from 'shared/hook';
import { getAllDialogs } from 'shared/model';
import { theme } from 'shared/themes';

import DialogMain from './DialogPage/DialogMain';
import styles from './dialog-page.module.scss';

export const DialogPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isMore1200px = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    dispatch(getAllDialogs({ query: '' }));
  }, []);

  return (
    <Grid container spacing={2} style={{ height: '100%' }}>
      <Grid item md={isMore1200px ? 9 : 12}>
        <DialogMain />
      </Grid>
      <Grid item md={3} className={styles.right} />
    </Grid>
  );
};
