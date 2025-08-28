import React, { Dispatch, SetStateAction } from "react";

import { useSelector } from "react-redux";
import { getDiets } from "shared/model/diet/diet-selector";

import { Grid } from "@mui/material";

import { TDietPlan } from "shared";

import { ArticlesFeedSkeleton, DietCard } from "widgets";

type TPostMain = {
  isFetching: boolean;
  isMainPage: boolean;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
};

export const DietsFeed: React.FC<TPostMain> = (props) => {
  const diets = useSelector(getDiets);

  return (
    <div style={{ position: "relative" }}>
      <Grid
        container
        sx={{ margin: 0 }}
        rowSpacing={{ xs: 1, sm: 2, md: 3 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        style={{ marginTop: "-10px", marginBottom: "30px" }}
      >
        {props.isFetching ? (
          <ArticlesFeedSkeleton />
        ) : (
          diets.map((el: TDietPlan) => (
            <Grid item xs={12} sm={12} md={12} key={el._id}>
              <DietCard key={el._id} diet={el} />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};
