import React, { useContext, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Grid } from '@mantine/core';

import { CommentsBlock } from 'widgets/comments';
import { Recommendations } from 'widgets/recommendations';

import { CreateComment } from 'features/create-comment';

import { Article } from 'entities/article';

import { useLazyGetOneArticleQuery } from 'shared/api';
import { ProfileContext } from 'shared/context';
import { useAppDispatch, useAppSelector, useMedia } from 'shared/hook';
import { getRecommendationPost, postsSelector } from 'shared/model';

import styles from './article-page.module.scss';

export const ArticlePage: React.FC = React.memo(() => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { authId, isAuth } = useContext(ProfileContext);

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

  return (
    <Grid>
      <Grid.Col span={mdMain}>
        {post && (
          <Article
            post={post}
            isFullPost
            isLoading={isFetching}
            isEditable={post.userId._id === authId}
          />
        )}

        {post && (
          <CommentsBlock items={post.comments} isLoading={isFetching}>
            {isAuth && <CreateComment postId={post._id} />}
          </CommentsBlock>
        )}
      </Grid.Col>

      <Grid.Col span={mdSide} className={styles.right}>
        <Recommendations posts={recommendations} />
      </Grid.Col>
    </Grid>
  );
});
