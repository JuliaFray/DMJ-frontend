import React, { useEffect, useState } from 'react';

import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';

import { Alert, Grid } from '@mui/material';

import { DietsFeed } from 'widgets/diet';

import { useLazyGetAllDietQuery } from 'shared/api';
import { useAppDispatch, useMedia } from 'shared/hook';
import { getDietsDataLength, getDietsIsFetching, getIsAuth } from 'shared/model';
import { CustomPagination } from 'shared/ui';

type TPostPage = {
  isOwner: boolean;
  isMainPage: boolean;
  userId: string;
  isFavorite: boolean;
  isLoad: boolean;
};
const DietPage: React.FC<TPostPage> = React.memo(
  ({ isMainPage, userId, isOwner, isFavorite, isLoad }) => {
    const { mdMain, mdSide } = useMedia(isMainPage);

    const isAuth = useSelector(getIsAuth);
    const isFetching = useSelector(getDietsIsFetching);
    const dataLength = useSelector(getDietsDataLength);

    const [currentPage, setCurrentPage] = useState(1);

    const [triggerGetAllDiet] = useLazyGetAllDietQuery();

    const dispatch = useAppDispatch();

    useEffect(() => {
      triggerGetAllDiet({});
    }, [dispatch, isOwner, isFavorite, userId]);

    useEffect(() => {
      triggerGetAllDiet({});
    }, [currentPage]);

    if (!isAuth) {
      return <Alert severity='error'>Вам необходимо авторизоваться, чтобы продолжить работу</Alert>;
    }

    return (
      <Grid container spacing={2} width='100%'>
        <Grid item md={mdMain} width='100%'>
          <DietsFeed
            isMainPage={isMainPage}
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
        {/* {isMainPage && <Grid item md={mdSide} className={styles.right}/>} */}
      </Grid>
    );
  },
);

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
