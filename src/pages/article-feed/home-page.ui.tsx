import React, { useEffect, useState } from 'react';

import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';

import EditIcon from '@mui/icons-material/Edit';
import { Box, Fab, Grid } from '@mui/material';

import { useLazyGetAllArticlesQuery, useLazyGetAllTagsQuery } from 'shared/api';
import {
  useAppDispatch,
  useAppSelector,
  useCreateQueryString,
  useMedia,
  useTagFilter,
} from 'shared/hook';
import { pathKeys } from 'shared/lib';
import {
  getAuthId,
  getFetchedPopularAuthors,
  getFetchedPopularTags,
  getIsAuth,
  getPopularAuthors,
  getPopularPost,
  getPopularTags,
  getPostsDataLength,
  getPostsIsFetching,
  RootState,
} from 'shared/model';
import { CustomPagination } from 'shared/ui';

import { ArticleFilter, ArticlesFeed, HomeTabs, TagWidget } from 'widgets';

import styles from './home-page.module.scss';

type TPostPage = {
  isOwner: boolean;
  isMainPage: boolean;
  userId: string;
  isFavorite: boolean;
  isLoad: boolean;
};
const HomePage: React.FC<TPostPage> = React.memo(({ isOwner, isMainPage, userId, isFavorite }) => {
  const { mdMain, mdSide } = useMedia(isMainPage);
  const { allTags, selectedTags, selectedAuthor, handleAddTag, handleRemoveTag } = useTagFilter();

  const isAuth = useSelector(getIsAuth);
  const isFetching = useAppSelector(getPostsIsFetching);
  const popularTags = useSelector(getFetchedPopularTags);
  const popularAuthors = useSelector(getFetchedPopularAuthors);
  const authId = useSelector(getAuthId);
  const dataLength = useSelector(getPostsDataLength);

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [triggerGetAllArticles] = useLazyGetAllArticlesQuery();
  const [triggerGetAllTags] = useLazyGetAllTagsQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isOwner) {
      dispatch(getPopularTags({}));
      dispatch(getPopularAuthors({}));
    }
    triggerGetAllTags({});
  }, [dispatch, isOwner, isFavorite, userId, triggerGetAllTags]);

  useEffect(() => {
    let query: Record<string, string | number | string[]> = {
      userId: userId || authId,
      currentPage,
      isFavoritePosts: JSON.stringify(isFavorite),
      tags: selectedTags.size
        ? JSON.stringify(Array.from(selectedTags)?.map((tag) => tag._id) || '')
        : '',
      authors: selectedAuthor ? JSON.stringify(selectedAuthor._id) : '',
      isMinePosts: JSON.stringify(isOwner),
    };

    if (isMainPage) {
      query = {
        ...query,
        tabIndex: JSON.stringify(tabIndex),
      };
    }

    triggerGetAllArticles({ searchParams: useCreateQueryString(query) }, false);

    if (!userId) {
      dispatch(getPopularPost({}));
    }
  }, [
    tabIndex,
    currentPage,
    selectedTags,
    selectedAuthor,
    userId,
    authId,
    isFavorite,
    isOwner,
    isMainPage,
    triggerGetAllArticles,
    dispatch,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [tabIndex]);

  return (
    <Grid container spacing={2}>
      <Grid item md={mdMain}>
        <>
          {isMainPage && <HomeTabs tabIndex={tabIndex} setTabIndex={setTabIndex} />}

          {isMainPage && <ArticleFilter allTags={allTags} handleRemoveTag={handleRemoveTag} />}

          <ArticlesFeed isFetching={isFetching} allTags={allTags} handleAddTag={handleAddTag} />

          <CustomPagination
            page={currentPage}
            dataLength={dataLength}
            setCurrentPage={setCurrentPage}
          />
        </>
      </Grid>

      <Grid item md={mdSide} className={styles.right}>
        {isMainPage && (
          <Box>
            <TagWidget
              title='Популярные темы'
              items={popularTags}
              handleAddTag={handleAddTag}
              selected={allTags}
            />
            <TagWidget
              title='Популярные авторы'
              items={popularAuthors}
              handleAddTag={handleAddTag}
              selected={allTags}
              isAuthor
            />
          </Box>
        )}
      </Grid>

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
  );
});

const mapStateToProps = (state: RootState) => ({
  isOwner: false,
  isMainPage: true,
  userId: '',
  isFavorite: false,
});

const GenericHomePage = compose<React.ComponentType & TPostPage>(connect(mapStateToProps))(
  HomePage,
);
export { HomePage, GenericHomePage };
