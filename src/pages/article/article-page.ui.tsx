import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Grid, useMediaQuery } from '@mui/material';

import { useAppDispatch } from 'shared/hook';
import {
  getAuthId,
  getIsAuth,
  getOnePost,
  getPost,
  getPostsIsFetching,
  getRecommendationPost,
  getRecommendations,
} from 'shared/model';
import { theme } from 'shared/themes';

import { Article } from 'entities/article';

import { CreateComment } from 'features';
import { CommentsBlock, Recommendations } from 'widgets';

import styles from './article-page.module.scss';

export const ArticlePage: React.FC = React.memo(() => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const isFetching = useSelector(getPostsIsFetching);
  const post = useSelector(getPost);
  const userId = useSelector(getAuthId);
  const recommendations = useSelector(getRecommendations);
  const isAuth = useSelector(getIsAuth);

  const isMore1200px = useMediaQuery(theme.breakpoints.up('lg'));
  const mdMain = isMore1200px ? 9 : 12;
  const mdSide = 3;

  useEffect(() => {
    if (id) {
      dispatch(getOnePost({ postId: id }));
      dispatch(getRecommendationPost({ originPostId: id }));
    }
  }, [id, dispatch]);

  return (
    <Grid container spacing={2}>
      <Grid item md={mdMain}>
        {post && (
          <Article
            post={post}
            isFullPost
            isLoading={isFetching}
            isEditable={post.author._id === userId}
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
