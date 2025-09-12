import React, { useEffect, useState } from 'react';

import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';

import { Grid, useMediaQuery } from '@mui/material';

import { DietsFeed } from 'widgets/diet';

import { useLazyGetAllDietQuery } from 'shared/api';
import { useAppDispatch } from 'shared/hook';
import { getDietsDataLength, getDietsIsFetching } from 'shared/model';
import { theme } from 'shared/themes';
import { CustomPagination } from 'shared/ui';

type TPostPage = {
  isOwner: boolean;
  isMainPage: boolean;
  userId: string;
  isFavorite: boolean;
  isLoad: boolean;
};
const DietPage: React.FC<TPostPage> = React.memo((props) => {
  const isMore1200px = useMediaQuery(theme.breakpoints.up('lg'));

  const isFetching = useSelector(getDietsIsFetching);
  const dataLength = useSelector(getDietsDataLength);

  const [currentPage, setCurrentPage] = useState(1);

  const [triggerGetAllDiet] = useLazyGetAllDietQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    triggerGetAllDiet({});
  }, [dispatch, props.isOwner, props.isFavorite, props.userId]);

  useEffect(() => {
    triggerGetAllDiet({});
  }, [currentPage]);

  // if (!props.userId) {
  //     return <Alert severity="error">Вам необходимо авторизоваться, чтобы продолжить работу</Alert>
  // }

  return (
    <Grid container spacing={2} width='100%'>
      <Grid item md={isMore1200px ? 9 : 12} width='100%'>
        <DietsFeed
          isMainPage={props.isMainPage}
          isFetching={isFetching}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <CustomPagination
          page={currentPage}
          dataLength={dataLength}
          setCurrentPage={setCurrentPage}
        />
      </Grid>
      {/* {props.isMainPage && <Grid item md={mdSide} className={styles.right}/>} */}
    </Grid>
  );
});

const mapStateToProps = () => ({
  isOwner: false,
  isMainPage: true,
  userId: '',
  isFavorite: false,
});

const GenericDietPage = compose<React.ComponentType & TPostPage>(connect(mapStateToProps))(
  DietPage,
);
export { DietPage, GenericDietPage };
