import React, { useContext, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Grid } from '@mui/material';

import { CommentsBlock } from 'widgets/comments';
import { Recommendations } from 'widgets/recommendations';

import { CreateComment } from 'features/create-comment';

import { Article } from 'entities/article';

import { ProfileContext } from 'shared/context';
import { useAppDispatch, useAppSelector, useMedia } from 'shared/hook';
import { getOnePost, getRecommendationPost, postsSelector } from 'shared/model';

import styles from './article-page.module.scss';

export const ArticlePage: React.FC = React.memo(() => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { authId, isAuth } = useContext(ProfileContext);

  const isFetching = useAppSelector(postsSelector.getPostsIsFetching);
  const post = useAppSelector(postsSelector.getPost);
  const recommendations = useAppSelector(postsSelector.getRecommendations);

  const { mdMain, mdSide } = useMedia();

  useEffect(() => {
    if (id) {
      dispatch(getOnePost({ postId: id }));
      dispatch(getRecommendationPost({ originPostId: id }));
    }
  }, [id, dispatch]);

  return (
    <Grid container spacing={2} width='100%' style={{ margin: 0, padding: 0 }}>
      <Grid item md={mdMain} width='100%' style={{ margin: 0, padding: 0 }}>
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
      </Grid>

      <Grid item md={mdSide} className={styles.right}>
        <Recommendations posts={recommendations} />
      </Grid>
    </Grid>
  );
});
