import React, { Dispatch, SetStateAction } from 'react';

import { Link } from 'react-router-dom';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Fab, Grid } from '@mui/material';

import { useAppSelector } from 'shared/hook';
import { pathKeys } from 'shared/lib';
import { getDiets, getIsAuth } from 'shared/model';
import { TDietPlan } from 'shared/types';

import { ArticlesFeedSkeleton, DietCard } from 'widgets';

type TPostMain = {
  isFetching: boolean;
  isMainPage: boolean;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
};

export const DietsFeed: React.FC<TPostMain> = ({ isFetching }) => {
  const diets = useAppSelector(getDiets);
  const isAuth = useAppSelector(getIsAuth);

  return (
    <div style={{ position: 'relative' }}>
      <Grid
        container
        sx={{ margin: 0 }}
        rowSpacing={{ xs: 1, sm: 2, md: 3 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        style={{ marginTop: '-10px', marginBottom: '30px' }}
      >
        {isFetching ? (
          <ArticlesFeedSkeleton />
        ) : (
          diets.map((el: TDietPlan) => (
            <Grid item xs={12} sm={12} md={12} key={el._id}>
              <DietCard key={el._id} diet={el} />
            </Grid>
          ))
        )}

        {isAuth && (
          <Link to={pathKeys.planner.editor.root()}>
            <Fab
              color='primary'
              aria-label='edit'
              style={{ position: 'fixed', bottom: '20px', right: '20px' }}
            >
              <AddOutlinedIcon />
            </Fab>
          </Link>
        )}
      </Grid>
    </div>
  );
};
