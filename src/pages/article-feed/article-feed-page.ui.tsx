import React, { useEffect, useState } from 'react';

import { PencilLineIcon } from '@phosphor-icons/react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';

import { ActionIcon, Affix, Box, Grid } from '@mantine/core';

import { ArticleFilter, ArticlesFeed } from 'widgets/article';
import { HomeTabs } from 'widgets/home-tabs';
import { TagWidget } from 'widgets/tag-widget';

import { useLazyGetAllArticlesQuery, useLazyGetAllTagsQuery } from 'shared/api';
import { useAuth } from 'shared/context';
import {
  useAppDispatch,
  useAppSelector,
  useCreateQueryString,
  useMedia,
  useTagFilter,
} from 'shared/hook';
import { pathKeys } from 'shared/lib';
import { getPopularAuthors, getPopularTags, postsSelector } from 'shared/model';
import { CustomPagination } from 'shared/ui';

import styles from './article-feed-page.module.scss';

type TPostPage = {
  showMyPosts: boolean;
  isFeedPage: boolean;
  userId: string;
  isFavorite: boolean;
};
const HomePage: React.FC<TPostPage> = React.memo(
  ({ showMyPosts, isFeedPage, userId, isFavorite }) => {
    const { mdMain, mdSide } = useMedia();
    const { allTags, selectedTags, selectedAuthor, handleAddTag, handleRemoveTag } = useTagFilter();

    const { authId } = useAuth();

    const popularTags = useAppSelector(postsSelector.getFetchedPopularTags);
    const popularAuthors = useAppSelector(postsSelector.getFetchedPopularAuthors);
    const dataLength = useAppSelector(postsSelector.getPostsDataLength);

    const [tabIndex, setTabIndex] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);

    const [triggerGetAllArticles] = useLazyGetAllArticlesQuery();
    const [triggerGetAllTags] = useLazyGetAllTagsQuery();

    const dispatch = useAppDispatch();

    useEffect(() => {
      setCurrentPage(1);
    }, [tabIndex, allTags]);

    useEffect(() => {
      if (!showMyPosts) {
        dispatch(getPopularTags({}));
        dispatch(getPopularAuthors({}));
      }
      triggerGetAllTags({});
    }, [dispatch, showMyPosts, isFavorite, userId, triggerGetAllTags]);

    useEffect(() => {
      let query: Record<string, string | number | string[]> = {
        userId: userId || authId || '',
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
          tabIndex,
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
      <Grid>
        <Grid.Col span={mdMain}>
          {isFeedPage && <HomeTabs tabIndex={tabIndex} setTabIndex={setTabIndex} />}
          {isFeedPage && <ArticleFilter allTags={allTags} handleRemoveTag={handleRemoveTag} />}

          <ArticlesFeed allTags={allTags} handleAddTag={handleAddTag} />

          <CustomPagination
            page={currentPage}
            dataLength={dataLength}
            setCurrentPage={setCurrentPage}
          />
        </Grid.Col>

        <Grid.Col span={mdSide} className={styles.right}>
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
        </Grid.Col>

        {isFeedPage && (
          <Affix position={{ bottom: 20, right: '20px' }}>
            <Link to={pathKeys.article.editor.root()}>
              <ActionIcon style={{ borderRadius: '50%', height: '56px', width: '56px' }}>
                <PencilLineIcon size={32} />
              </ActionIcon>
            </Link>
          </Affix>
        )}
      </Grid>
    );
  },
);

const mapStateToProps = () => ({
  showMyPosts: false,
  isFeedPage: true,
  userId: '',
  isFavorite: false,
});

const GenericHomePage = compose<React.ComponentType & TPostPage>(connect(mapStateToProps))(
  HomePage,
);
export { HomePage, GenericHomePage };
