import React, { useEffect, useState } from 'react';

import { connect, useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';

import { Box, Grid, useMediaQuery } from '@mui/material';

import { useLazyGetAllArticlesQuery, useLazyGetAllTagsQuery } from 'shared/api';
import { useAppDispatch, useAppSelector, useCreateQueryString } from 'shared/hook';
import {
  getAuthId,
  getFetchedPopularAuthors,
  getFetchedPopularTags,
  getPopularAuthors,
  getPopularPost,
  getPopularTags,
  getPostsDataLength,
  getPostsIsFetching,
  RootState,
} from 'shared/model';
import { theme } from 'shared/themes';
import { TChipData } from 'shared/types';
import { CustomPagination } from 'shared/ui';

import { ArticleFilter, ArticlesFeed, HomeTabs, TagWidget } from 'widgets';

import styles from './home-page.module.scss';

type TPostPage = {
  isOwner: boolean;
  isMainPage: boolean;
  userId: string | '';
  isFavorite: boolean;
  isLoad: boolean;
};
const HomePage: React.FC<TPostPage> = React.memo(({ isOwner, isMainPage, userId, isFavorite }) => {
  const isMore1200px = useMediaQuery(theme.breakpoints.up('lg'));
  const mdMain = isMainPage && isMore1200px ? 9 : 12;
  const mdSide = 3;

  const isFetching = useAppSelector(getPostsIsFetching);
  const popularTags = useSelector(getFetchedPopularTags);
  const popularAuthors = useSelector(getFetchedPopularAuthors);
  const authId = useSelector(getAuthId);
  const dataLength = useSelector(getPostsDataLength);

  const [selectedTags, setSelectedTags] = useState<Set<TChipData>>(new Set());
  const [selectedAuthors, setSelectedAuthors] = useState<Set<TChipData>>(new Set());
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>('');
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
  }, [dispatch, isOwner, isFavorite, userId]);

  useEffect(() => {
    let query: Record<string, any> = {
      userId: userId || authId,
      searchValue,
      currentPage,
      isFavoritePosts: JSON.stringify(isFavorite),
      tags: selectedTags.size
        ? JSON.stringify(Array.from(selectedTags)?.map((tag) => tag._id) || '')
        : '',
      authors: selectedAuthors.size
        ? JSON.stringify(Array.from(selectedAuthors)?.map((tag) => tag._id) || '')
        : '',
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
  }, [tabIndex, searchValue, currentPage, selectedTags, selectedAuthors]);

  useEffect(() => {
    setCurrentPage(1);
  }, [tabIndex]);

  return (
    <Grid container spacing={2}>
      <Grid item md={mdMain}>
        {isMainPage && (
          <Box className={styles.hiddenWidget}>
            <TagWidget
              title='Популярные темы'
              items={popularTags}
              setSelectedTags={setSelectedTags}
            />
            <TagWidget
              title='Популярные авторы'
              items={popularAuthors}
              setSelectedTags={setSelectedAuthors}
            />
          </Box>
        )}

        {isMainPage && <HomeTabs setSearchValue={setSearchValue} setTabIndex={setTabIndex} />}

        {isMainPage && (
          <ArticleFilter
            tags={[...Array.from(selectedTags), ...Array.from(selectedAuthors)]}
            setSelectedTags={setSelectedTags}
            setSelectedAuthors={setSelectedAuthors}
          />
        )}

        <ArticlesFeed
          isMainPage={isMainPage}
          isFetching={isFetching}
          setSearchValue={setSearchValue}
          setTabIndex={setTabIndex}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <CustomPagination
          page={currentPage}
          dataLength={dataLength}
          setCurrentPage={setCurrentPage}
        />
      </Grid>

      <Grid item md={mdSide} className={styles.right}>
        {isMainPage && (
          <Box>
            <TagWidget
              title='Популярные темы'
              items={popularTags}
              setSelectedTags={setSelectedTags}
            />

            <TagWidget
              title='Популярные авторы'
              items={popularAuthors}
              setSelectedTags={setSelectedAuthors}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
});

const mapStateToProps = () => ({
  isOwner: false,
  isMainPage: true,
  userId: '',
  isFavorite: false,
});

const GenericHomePage = compose<React.ComponentType & TPostPage>(connect(mapStateToProps))(
  HomePage,
);
export { HomePage, GenericHomePage };
