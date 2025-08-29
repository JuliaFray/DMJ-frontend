import React, {useEffect, useState} from "react";

import {connect, useDispatch, useSelector} from "react-redux";
import {compose} from "redux";
import {RootState} from "shared/model/redux-store";
import {theme} from "shared/themes/theme";

import {Box, Grid, useMediaQuery} from "@mui/material";

import {
    CustomPagination,
    getAuthId,
    getFetchedPopularTags,
    getPopularPost,
    getPopularTags,
    getPostsDataLength,
    getPostsIsFetching,
    TChipData,
    useCreateQueryString,
    useLazyGetAllArticlesQuery,
    useLazyGetAllTagsQuery,
} from "shared";

import {ArticleFilter, ArticlesFeed, HomeTabs, TagWidget,} from "widgets";

import {getFetchedPopularAuthors} from '../../shared/model/posts/posts-selectors';
import {getPopularAuthors} from '../../shared/model/posts/posts-thunks';

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
    const popularAuthors = useSelector(getFetchedPopularAuthors);
    const authId = useSelector(getAuthId);
    const dataLength = useSelector(getPostsDataLength);

    const [selectedTags, setSelectedTags] = useState<Set<TChipData>>(new Set());
    const [selectedAuthors, setSelectedAuthors] = useState<Set<TChipData>>(new Set());
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);

    const [triggerGetAllArticles] = useLazyGetAllArticlesQuery();
    const [triggerGetAllTags] = useLazyGetAllTagsQuery();

    const dispatch = useDispatch();

    useEffect(() => {
        if (!props.isOwner) {
            dispatch(getPopularTags({}));
            dispatch(getPopularAuthors({}));
        }
        triggerGetAllTags({});
    }, [dispatch, props.isOwner, props.isFavorite, props.userId]);

    useEffect(() => {
        let query: Record<string, any> = {
            userId: props.userId || authId,
            searchValue: searchValue,
            currentPage: currentPage,
            isFavoritePosts: JSON.stringify(props.isFavorite),
            tags: selectedTags.size ? JSON.stringify(Array.from(selectedTags)?.map(tag => tag._id) || '') : '',
            authors: selectedAuthors.size ? JSON.stringify(Array.from(selectedAuthors)?.map(tag => tag._id) || '') : '',
            isMinePosts: JSON.stringify(props.isOwner),
        };

        if (props.isMainPage) {
            query = {
                ...query,
                tabIndex: JSON.stringify(tabIndex),
            };
        }

        triggerGetAllArticles({searchParams: useCreateQueryString(query)}, false);

        if (!props.userId) {
            dispatch(getPopularPost({}));
        }
    }, [tabIndex, searchValue, currentPage, selectedTags, selectedAuthors]);


    useEffect(() => {
        setCurrentPage(1);
    }, [tabIndex]);

    return (
        <Grid container spacing={2}>
            <Grid item md={mdMain}>

                {props.isMainPage && (
                    <Box className={styles.hiddenWidget}>
                        <TagWidget
                            title={'Популярные темы'}
                            items={popularTags}
                            setSelectedTags={setSelectedTags}
                        />
                        <TagWidget
                            title={'Популярные авторы'}
                            items={popularAuthors}
                            setSelectedTags={setSelectedAuthors}
                        />
                    </Box>
                )}

                {props.isMainPage && (
                    <HomeTabs setSearchValue={setSearchValue} setTabIndex={setTabIndex}/>
                )}

                {props.isMainPage && <ArticleFilter tags={[...Array.from(selectedTags), ...Array.from(selectedAuthors)]}
                                                    setSelectedTags={setSelectedTags}
				                                    setSelectedAuthors={setSelectedAuthors}/>}


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
                        title={'Популярные темы'}
                        items={popularTags}
                        setSelectedTags={setSelectedTags}
                    />

                    <TagWidget
                        title={'Популярные авторы'}
                        items={popularAuthors}
                        setSelectedTags={setSelectedAuthors}
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
export {HomePage, GenericHomePage};
