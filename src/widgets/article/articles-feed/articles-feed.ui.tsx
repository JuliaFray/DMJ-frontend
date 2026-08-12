import React from 'react';

import { isEmpty } from 'lodash';

import { Grid } from '@mantine/core';

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
    <Grid>
      {!isFetching &&
        posts.map((el: IPost) => (
          <Grid.Col key={el._id}>
            {el.userId && (
              <ArticleCard
                key={el._id}
                isOneArticlePage={false}
                post={el}
                allTags={allTags}
                handleAddTag={handleAddTag}
              />
            )}
          </Grid.Col>
        ))}
    </Grid>
  );
};
