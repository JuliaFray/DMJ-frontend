import React, { useEffect, useState } from "react";

import { connect, useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import { RootState } from "shared/model/redux-store";
import { theme } from "shared/themes/theme";

import { Box, Grid, useMediaQuery } from "@mui/material";

import {
  CustomPagination,
  getAllFetchedTags,
  getAuthId,
  getFetchedPopularTags,
  getPopularPost,
  getPopularPosts,
  getPopularTags,
  getPostsDataLength,
  getPostsIsFetching,
  TArticle,
  TChipData,
  useCreateQueryString,
  useLazyGetAllArticlesQuery,
  useLazyGetAllTagsQuery,
  useQueryParams,
} from "shared";

import {
  ArticleCarousel,
  ArticlesFeed,
  HomeTabs,
  PopularPost,
  TagWidget,
} from "widgets";

import styles from "./home-page.module.scss";

type TPostPage = {
  isOwner: boolean;
  isMainPage: boolean;
  userId: string | "";
  isFavorite: boolean;
  isLoad: boolean;
};
const HomePage: React.FC<TPostPage> = React.memo((props, context) => {
  const isMore1200px = useMediaQuery(theme.breakpoints.up("lg"));
  const mdMain = props.isMainPage && isMore1200px ? 9 : 12;
  const mdSide = 3;

  const isFetching = useSelector(getPostsIsFetching);
  const popularTags = useSelector(getFetchedPopularTags);
  const allTags = useSelector(getAllFetchedTags);
  const authId = useSelector(getAuthId);
  const popularPosts = useSelector(getPopularPosts);
  const dataLength = useSelector(getPostsDataLength);

  const { queryParams, setQueryParams } = useQueryParams({ tags: "" });

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const [triggerGetAllArticles] = useLazyGetAllArticlesQuery();
  const [triggerGetAllTags] = useLazyGetAllTagsQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!props.isOwner) {
      dispatch(getPopularTags({}));
    }
    triggerGetAllTags({});
  }, [dispatch, props.isOwner, props.isFavorite, props.userId]);

  useEffect(() => {
    const tag = queryParams.tags?.toString();
    setSelectedTag(tag);

    let query: Record<string, any> = {
      userId: props.userId || authId,
      searchValue: searchValue,
      currentPage: currentPage,
      isFavoritePosts: JSON.stringify(props.isFavorite),
      tags: allTags.find((it: TChipData) => it.value === tag)?._id || "",
      isMinePosts: JSON.stringify(props.isOwner),
    };

    if (props.isMainPage) {
      query = {
        ...query,
        tabIndex: JSON.stringify(tabIndex),
      };
    }

    triggerGetAllArticles({ searchParams: useCreateQueryString(query) }, false);

    if (!props.userId && !tag) {
      dispatch(getPopularPost({}));
    }
  }, [queryParams, tabIndex, searchValue, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [tabIndex]);

  return (
    <Grid container spacing={2}>
      <Grid item md={mdMain}>
        {props.isMainPage && (
          <HomeTabs setSearchValue={setSearchValue} setTabIndex={setTabIndex} />
        )}

        {props.isMainPage && (
          <Box className={styles.hiddenWidget}>
            <TagWidget
              items={popularTags}
              isLoading={isFetching}
              query={selectedTag}
            />
          </Box>
        )}

        {!!popularPosts.length && (
          <ArticleCarousel posts={popularPosts}>
            {popularPosts.map((item: TArticle) => (
              <PopularPost key={item._id} post={item} />
            ))}
          </ArticleCarousel>
        )}

        <ArticlesFeed
          isMainPage={props.isMainPage}
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
      {props.isMainPage && (
        <Grid item md={mdSide} className={styles.right}>
          <TagWidget
            items={popularTags}
            isLoading={isFetching}
            query={selectedTag}
          />
        </Grid>
      )}
    </Grid>
  );
});

const mapStateToProps = (state: RootState) => ({
  isOwner: false,
  isMainPage: true,
  userId: "",
  isFavorite: false,
});

const GenericHomePage = compose<React.ComponentType & TPostPage>(
  connect(mapStateToProps)
)(HomePage);
export { HomePage, GenericHomePage };
