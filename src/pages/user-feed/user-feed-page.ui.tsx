import React, { useState } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { Grid } from '@mantine/core';

import { UsersFeed } from 'widgets/users';

import { useAppSelector } from 'shared/hook';
import { usersSelector } from 'shared/model';
import { CustomPagination } from 'shared/ui';

export type IUsersPage = {
  isMainPage: boolean;
  isFollowers: boolean;
};

const UsersPage: React.FC<IUsersPage> = React.memo((props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataLength = useAppSelector(usersSelector.getTotalCount);

  return (
    <Grid>
      <Grid.Col>
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
      </Grid.Col>
    </Grid>
  );
});

const mapStateToProps = () => ({
  isMainPage: true,
  isFollowers: false,
});

const GenericUsersPage = compose<React.ComponentType & IUsersPage>(connect(mapStateToProps))(
  UsersPage,
);
export { UsersPage, GenericUsersPage };
