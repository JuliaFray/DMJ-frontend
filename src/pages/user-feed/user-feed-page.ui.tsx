import React, { useState } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { Grid, useMediaQuery } from '@mui/material';

import { UsersFeed } from 'widgets/users';

import { useAppSelector } from 'shared/hook';
import { RootState, usersSelector } from 'shared/model';
import { theme } from 'shared/themes';
import { CustomPagination } from 'shared/ui';

export type IUsersPage = {
  isMainPage: boolean;
  isFollowers: boolean;
};

const UsersPage: React.FC<IUsersPage> = React.memo((props, context) => {
  const isMore1200px = useMediaQuery(theme.breakpoints.up('lg'));
  const mdMain = props.isMainPage && isMore1200px ? 9 : 12;

  const [currentPage, setCurrentPage] = useState(1);
  const dataLength = useAppSelector(usersSelector.getTotalCount);

  return (
    <Grid container spacing={2} width='100%' style={{ margin: 0, padding: 0 }}>
      <Grid item md={mdMain} width='100%' style={{ margin: 0, padding: 0 }}>
        <UsersFeed
          isFollowers={props.isFollowers}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <CustomPagination
          page={currentPage}
          dataLength={dataLength}
          setCurrentPage={setCurrentPage}
        />
      </Grid>
    </Grid>
  );
});

const mapStateToProps = (state: RootState) => ({
  isMainPage: true,
  isFollowers: false,
});

const GenericUsersPage = compose<React.ComponentType & IUsersPage>(connect(mapStateToProps))(
  UsersPage,
);
export { UsersPage, GenericUsersPage };
