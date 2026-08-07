import React from 'react';

import { isEmpty } from 'lodash';

import { Grid } from '@mui/material';

import { ArticleCard, ArticlesFeedSkeleton } from 'widgets/article';

import { useAppSelector } from 'shared/hook';
import { postsSelector } from 'shared/model';
import { IPost, TChipData } from 'shared/types';

type TPostMain = {
  allTags: TChipData[];
  handleAddTag: (item: TChipData, isAuthor?: boolean) => void;
};

export const ArticlesFeed: React.FC<TPostMain> = ({ allTags, handleAddTag }) => {
  const posts = useAppSelector(postsSelector.getPosts);
  const isFetching = useAppSelector(postsSelector.getPostsIsFetching);

  if (isFetching) {
    return <ArticlesFeedSkeleton />;
  }

  if (isEmpty(posts)) {
    return <div style={{ textAlign: 'center' }}>К сожалению, ничего не найдено</div>;
  }

  return (
    <Grid
      container
      sx={{ margin: 0 }}
      rowSpacing={{ xs: 1, sm: 2, md: 3 }}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      style={{ marginTop: '-10px', marginBottom: '30px' }}
    >
      {!isFetching &&
        posts.map((el: IPost) => (
          <Grid item xs={12} sm={12} md={12} key={el._id}>
            {el.userId && (
              <ArticleCard
                key={el._id}
                isOneArticlePage={false}
                post={el}
                avatarAbbr={el.userId.login?.substring(0, 1).toUpperCase() || 'U'}
                allTags={allTags}
                handleAddTag={handleAddTag}
              />
            )}
          </Grid>
        ))}
    </Grid>
  );
};
