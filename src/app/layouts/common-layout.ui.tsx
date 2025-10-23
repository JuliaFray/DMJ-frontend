import React, { ReactNode } from 'react';

import { Grid, SxProps, useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';

import { theme } from 'shared/themes';
import { ScrollToTop } from 'shared/ui';

import styles from './layout.module.scss';
// todo drop
type IPageLayout = {
  isMainPage: boolean;
  mainChildren: ReactNode;
  leftChildren?: ReactNode;
  rightChildren?: ReactNode;
  mainSx?: SxProps<Theme>;
};
export const CommonLayout: React.FC<IPageLayout> = ({
  isMainPage,
  mainSx,
  mainChildren,
  leftChildren,
  rightChildren,
}) => {
  const isMore1200px = useMediaQuery(theme.breakpoints.up('lg'));
  const hasRightChildren = rightChildren ? 8.5 : 12;
  const forMore1200px = isMore1200px ? 7 : hasRightChildren;
  const mdMain = isMainPage ? forMore1200px : 12;

  const mdSide = isMore1200px ? 2.5 : 3.5;

  return (
    <div className={styles.main}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        {isMore1200px && isMainPage && (
          <Grid item md={2.5} className={styles.left}>
            {leftChildren}
          </Grid>
        )}

        <Grid item xs={12} sm={12} md={mdMain} sx={mainSx || { height: 'auto' }}>
          {mainChildren}
        </Grid>

        {rightChildren && isMainPage && (
          <Grid item md={mdSide} className={styles.right}>
            {rightChildren}
          </Grid>
        )}
      </Grid>
      <ScrollToTop />
    </div>
  );
};
