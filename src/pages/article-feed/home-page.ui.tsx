import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
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
  getPopularTags,
  getPostsDataLength,
  getPostsIsFetching,
  RootState,
} from 'shared/model';
import { CustomPagination } from 'shared/ui';

import { ArticleFilter, ArticlesFeed, HomeTabs, TagWidget } from 'widgets';

import styles from './home-page.module.scss';

type TPostPage = {
  showMyPosts: boolean;
  isFeedPage: boolean;
  userId: string;
  isFavorite: boolean;
  isLoad: boolean;
};
const HomePage: React.FC<TPostPage> = React.memo(
  ({ showMyPosts, isFeedPage, userId, isFavorite }) => {
    const { mdMain, mdSide } = useMedia(isFeedPage);
    const { allTags, selectedTags, selectedAuthor, handleAddTag, handleRemoveTag } = useTagFilter();

    const isAuth = useAppSelector(getIsAuth);
    const isFetching = useAppSelector(getPostsIsFetching);
    const popularTags = useAppSelector(getFetchedPopularTags);
    const popularAuthors = useAppSelector(getFetchedPopularAuthors);
    const authId = useAppSelector(getAuthId);
    const dataLength = useAppSelector(getPostsDataLength);

    const [tabIndex, setTabIndex] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [triggerGetAllArticles] = useLazyGetAllArticlesQuery();
    const [triggerGetAllTags] = useLazyGetAllTagsQuery();

    const dispatch = useAppDispatch();

    useEffect(() => {
      setCurrentPage(1);
    }, [tabIndex]);

    useEffect(() => {
      if (!showMyPosts) {
        dispatch(getPopularTags({}));
        dispatch(getPopularAuthors({}));
      }
      triggerGetAllTags({});
    }, [dispatch, showMyPosts, isFavorite, userId, triggerGetAllTags]);

    useEffect(() => {
      let query: Record<string, string | number | string[]> = {
        userId: userId || authId,
        currentPage,
        isFavoritePosts: JSON.stringify(isFavorite),
        tags: selectedTags.size
          ? JSON.stringify(Array.from(selectedTags)?.map((tag) => tag._id) || '')
          : '',
        authors: selectedAuthor ? JSON.stringify(selectedAuthor._id) : '',
        isMinePosts: JSON.stringify(showMyPosts),
      };

      if (isFeedPage) {
        query = {
          ...query,
          tabIndex: JSON.stringify(tabIndex),
        };
      }

      triggerGetAllArticles({ searchParams: useCreateQueryString(query) }, false);
    }, [
      tabIndex,
      currentPage,
      selectedTags,
      selectedAuthor,
      userId,
      authId,
      isFavorite,
      showMyPosts,
      isFeedPage,
      triggerGetAllArticles,
      dispatch,
    ]);

    return (
      <Grid container spacing={2}>
        <Grid item md={mdMain}>
          {isFeedPage && <HomeTabs tabIndex={tabIndex} setTabIndex={setTabIndex} />}
          {isFeedPage && <ArticleFilter allTags={allTags} handleRemoveTag={handleRemoveTag} />}

          <ArticlesFeed isFetching={isFetching} allTags={allTags} handleAddTag={handleAddTag} />

          <CustomPagination
            page={currentPage}
            dataLength={dataLength}
            setCurrentPage={setCurrentPage}
          />
        </Grid>

        <Grid item md={mdSide} className={styles.right}>
          {isFeedPage && (
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

        {isFeedPage && isAuth && (
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
  },
);

const mapStateToProps = (state: RootState) => ({
  showMyPosts: false,
  isFeedPage: true,
  userId: '',
  isFavorite: false,
});

const GenericHomePage = compose<React.ComponentType & TPostPage>(connect(mapStateToProps))(
  HomePage,
);
export { HomePage, GenericHomePage };
