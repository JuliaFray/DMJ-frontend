import React, { useEffect, useState } from "react";

import { connect, useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import { useLazyGetAllDietQuery } from "shared/api/diet-api";
import {
  getDietsDataLength,
  getDietsIsFetching,
} from "shared/model/diet/diet-selector";
import { RootState } from "shared/model/redux-store";
import { theme } from "shared/themes/theme";
import { CustomPagination } from "shared/ui/pagination";
import { DietsFeed } from "widgets/diet/diet-feed";

import { Grid, useMediaQuery } from "@mui/material";

type TPostPage = {
  isOwner: boolean;
  isMainPage: boolean;
  userId: string | "";
  isFavorite: boolean;
  isLoad: boolean;
};
const DietPage: React.FC<TPostPage> = React.memo((props) => {
  const isMore1200px = useMediaQuery(theme.breakpoints.up("lg"));
  const mdMain = props.isMainPage && isMore1200px ? 9 : 12;
  const mdSide = 3;

  const isFetching = useSelector(getDietsIsFetching);
  const dataLength = useSelector(getDietsDataLength);

  const [currentPage, setCurrentPage] = useState(1);

  const [triggerGetAllDiet] = useLazyGetAllDietQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    triggerGetAllDiet({});
  }, [dispatch, props.isOwner, props.isFavorite, props.userId]);

  useEffect(() => {
    triggerGetAllDiet({});
  }, [currentPage]);

  return (
    <Grid container spacing={2} width={"100%"}>
      <Grid item md={isMore1200px ? 9 : 12} width={"100%"}>
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
      {/*{props.isMainPage && <Grid item md={mdSide} className={styles.right}/>}*/}
    </Grid>
  );
});

const mapStateToProps = (state: RootState) => ({
  isOwner: false,
  isMainPage: true,
  userId: "",
  isFavorite: false,
});

const GenericDietPage = compose<React.ComponentType & TPostPage>(
  connect(mapStateToProps)
)(DietPage);
export { DietPage, GenericDietPage };
