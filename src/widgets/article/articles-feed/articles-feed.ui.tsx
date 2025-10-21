import React from 'react';

import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';

import { Grid } from '@mui/material';

import { useAppSelector } from 'shared/hook';
import { getPosts, getPostsDataLength } from 'shared/model';
import { TArticle, TChipData } from 'shared/types';

import { ArticleCard, ArticlesFeedSkeleton } from 'widgets';

type TPostMain = {
  isFetching: boolean;
  allTags: TChipData[];
  handleAddTag: (item: TChipData, isAuthor?: boolean) => void;
};

export const ArticlesFeed: React.FC<TPostMain> = ({ isFetching, allTags, handleAddTag }) => {
  const posts = useAppSelector(getPosts);
  const dataLength = useAppSelector(getPostsDataLength);

  return (
    <Grid
      container
      sx={{ margin: 0 }}
      rowSpacing={{ xs: 1, sm: 2, md: 3 }}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      style={{ marginTop: '-10px', marginBottom: '30px' }}
    >
      {isFetching && <ArticlesFeedSkeleton />}
      {!isFetching && isEmpty(posts) && <div>К сожалению ничего не найдено</div>}
      {!isFetching &&
        posts.map((el: TArticle) => (
          <Grid item xs={12} sm={12} md={12} key={el._id}>
            {el.author && (
              <ArticleCard
                key={el._id}
                isOneArticlePage={false}
                post={el}
                avatarAbbr={el.author.login?.substring(0, 1).toUpperCase() || 'U'}
                allTags={allTags}
                handleAddTag={handleAddTag}
              />
            )}
          </Grid>
        ))}
    </Grid>
  );
};
