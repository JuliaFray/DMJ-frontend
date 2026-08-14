import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Grid, Skeleton } from '@mantine/core';

import { CommentsBlock } from 'widgets/comments';
import { Recommendations } from 'widgets/recommendations';

import { CreateComment } from 'features/create-comment';

import { Article } from 'entities/article';

import { useLazyGetOneArticleQuery } from 'shared/api';
import { useAuth } from 'shared/context';
import { useAppDispatch, useAppSelector, useMedia } from 'shared/hook';
import { getRecommendationPost, postsSelector } from 'shared/model';

import styles from './article-page.module.scss';

export const ArticlePage: React.FC = React.memo(() => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { authId } = useAuth();

  const isFetching = useAppSelector(postsSelector.getPostsIsFetching);
  const post = useAppSelector(postsSelector.getPost);
  const recommendations = useAppSelector(postsSelector.getRecommendations);
  const [getOnePost] = useLazyGetOneArticleQuery();
  const { mdMain, mdSide } = useMedia();

  useEffect(() => {
    if (id) {
      getOnePost({ postId: id });
      dispatch(getRecommendationPost({ originPostId: id }));
    }
  }, [id, dispatch, getOnePost]);

  if (!post) {
    return null;
  }

  return (
    <Grid>
      <Grid.Col span={mdMain}>
        <Skeleton visible={isFetching}>
          <Article post={post} isEditable={post.userId._id === authId} />
        </Skeleton>

        <Skeleton visible={isFetching}>
          <CommentsBlock items={post.comments}>
            <CreateComment postId={post._id} />
          </CommentsBlock>
        </Skeleton>
      </Grid.Col>

      <Grid.Col span={mdSide} className={styles.right}>
        <Recommendations posts={recommendations} />
      </Grid.Col>
    </Grid>
  );
});
