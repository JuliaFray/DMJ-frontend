import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import {TArticle} from "entities/article";
import {TChipData} from "entities/tag";
import {connect, useDispatch, useSelector} from 'react-redux';
import {compose} from 'redux';
import {createQueryString, useQueryParams} from 'shared/hook/hooks';
import {getAuthId} from 'shared/model/auth/auth-selectors';
import {getAllFetchedTags, getDataLength, getFetchedPopularTags, getIsFetching, getPopularPosts} from 'shared/model/posts/posts-selectors';
import {getAllPosts, getPopularPost, getPopularTags} from 'shared/model/posts/posts-thunks';
import {RootState} from 'shared/model/redux-store';
import {CustomPagination} from "shared/ui/pagination";
import {PopularPost} from "widgets/article-card/PopularPost";
import {ArticleCarousel} from "widgets/article-carousel/article-carousel.ui";
import {ArticlesFeed} from 'widgets/articles-feed/articles-feed.ui';
import {HomeTabs} from "widgets/home-tabs";
import {TagWidget} from 'widgets/tag-widget/tag-widget.ui';
import styles from './home-page.module.scss';

type TPostPage = {
    isOwner: boolean,
    isMainPage: boolean,
    userId: string | '',
    isFavorite: boolean,
    isLoad: boolean
}
const HomePage: React.FC<TPostPage> = React.memo((props, context) => {

    // const isMore1200px = useMediaQuery(theme.breakpoints.up('lg'));
    const mdMain = props.isMainPage ? 9 : 12
    const mdSide = 3;

    const isFetching = useSelector(getIsFetching);
    const popularTags = useSelector(getFetchedPopularTags);
    const allTags = useSelector(getAllFetchedTags);
    const authId = useSelector(getAuthId);
    const popularPosts = useSelector(getPopularPosts);
    const dataLength = useSelector(getDataLength);

    const {queryParams, setQueryParams} = useQueryParams({tags: ''});

    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        if(!props.isOwner) {
            dispatch(getPopularTags({}))
        }
    }, [dispatch, props.isOwner, props.isFavorite, props.userId])

    useEffect(() => {
        const tag = queryParams.tags?.toString();
        setSelectedTag(tag);

        let query: Record<string, any> = {
            userId: props.userId || authId,
            searchValue: searchValue,
            currentPage: currentPage,
            isFavoritePosts: JSON.stringify(props.isFavorite),
            tags: allTags.find((it: TChipData) => it.value === tag)?._id || '',
            isMinePosts: JSON.stringify(props.isOwner),
        };

        if(props.isMainPage) {
            query = {
                ...query,
                tabIndex: JSON.stringify(tabIndex)
            }
        }

        dispatch(getAllPosts({query: createQueryString(query)}));

        if(!props.userId && !tag) {
            dispatch(getPopularPost({}));
        }
    }, [queryParams, tabIndex, searchValue, currentPage])

    useEffect(() => {
        setCurrentPage(1);
    }, [tabIndex])

    return (
        <Grid container spacing={2}>
            <Grid item md={mdMain}>
                {props.isMainPage && <HomeTabs setSearchValue={setSearchValue} setTabIndex={setTabIndex}/>}

                {!!popularPosts.length && <ArticleCarousel posts={popularPosts}>
                    {popularPosts.map((item: TArticle) => <PopularPost key={item._id} post={item}/>)}
                </ArticleCarousel>}

                <ArticlesFeed isMainPage={props.isMainPage} isFetching={isFetching}
                              selectedTag={selectedTag} setSearchValue={setSearchValue}
                              setTabIndex={setTabIndex} setSelectedTag={setSelectedTag}
                              currentPage={currentPage} setCurrentPage={setCurrentPage}/>

                <CustomPagination page={currentPage} dataLength={dataLength} setCurrentPage={setCurrentPage}/>
            </Grid>
            <Grid item md={mdSide} className={styles.right}>
                <TagWidget items={popularTags} isLoading={isFetching} query={selectedTag}/>
            </Grid>
        </Grid>
    );
});

const mapStateToProps = (state: RootState) => ({
    isOwner: false,
    isMainPage: true,
    userId: '',
    isFavorite: false
});


const GenericHomePage = compose<React.ComponentType & TPostPage>(connect(mapStateToProps))(HomePage);
export {HomePage, GenericHomePage};
