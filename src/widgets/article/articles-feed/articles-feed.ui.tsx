import React, { Dispatch, SetStateAction } from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import { Fab, Grid } from '@mui/material';

import { pathKeys } from 'shared/lib';
import { getIsAuth, getPosts } from 'shared/model';
import { TArticle, TChipData } from 'shared/types';

import { ArticleCard, ArticlesFeedSkeleton } from 'widgets';

type TPostMain = {
  isFetching: boolean;
  isMainPage: boolean;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setTabIndex: Dispatch<SetStateAction<number>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  allTags: TChipData[];
  handleAddTag: (item: TChipData, isAuthor?: boolean) => void;
};

export const ArticlesFeed: React.FC<TPostMain> = ({
  isMainPage,
  isFetching,
  allTags,
  handleAddTag,
}) => {
  const posts = useSelector(getPosts);
  const isAuth = useSelector(getIsAuth);

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
          posts.map((el: TArticle) => (
            <Grid item xs={12} sm={12} md={12} key={el._id}>
              {el.author && (
                <ArticleCard
                  key={el._id}
                  isMain={false}
                  post={el}
                  avatarAbbr={el.author?.firstName?.substring(0, 1).toUpperCase() || 'U'}
                  allTags={allTags}
                  handleAddTag={handleAddTag}
                />
              )}
            </Grid>
          ))
        )}

        {isMainPage && isAuth && (
          <Link to={pathKeys.article.editor.root()}>
            <Fab
              color='primary'
              aria-label='edit'
              style={{ position: 'fixed', bottom: '20px', right: '20px' }}
            >
              <EditIcon />
            </Fab>
          </Link>
        )}
      </Grid>
    </div>
  );
};
