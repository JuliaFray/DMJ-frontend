import React, {useEffect, useState} from 'react';
import {TChipData} from "entities/tag";
import {connect, useDispatch, useSelector} from 'react-redux';
import {compose} from 'redux';
import {createQueryString, useQueryParams} from 'shared/hook/hooks';
import {withAuthRedirect} from 'shared/lib/react/react.hoc';
import {getAuthId} from 'shared/model/auth/auth-selectors';
import {getAllFetchedTags, getFetchedPopularTags, getIsFetching} from 'shared/model/posts/posts-selectors';
import {getAllPosts, getPopularPost, getPopularTags} from 'shared/model/posts/posts-thunks';
import {RootState} from 'shared/model/redux-store';
import CommonLayoutUi from 'shared/ui/layouts/common-layout.ui';
import PostMain from './PostMain';
import TagsBlock from './TagsBlock';

export type IPostPage = {
    isOwner: boolean,
    isMainPage: boolean,
    userId: string | '',
    isFavorite: boolean,
    isLoad: boolean
}
const PostPage: React.FC<IPostPage> = React.memo((props, context) => {

    const isFetching = useSelector(getIsFetching);
    const popularTags = useSelector(getFetchedPopularTags);
    const allTags = useSelector(getAllFetchedTags);
    const authId = useSelector(getAuthId);

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
            isMinePosts: JSON.stringify(props.isOwner)
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
        <CommonLayoutUi isMainPage={props.isMainPage}
                        mainChildren={<PostMain isMainPage={props.isMainPage} isFetching={isFetching}
                                            selectedTag={selectedTag} setSearchValue={setSearchValue}
                                            setTabIndex={setTabIndex} setSelectedTag={setSelectedTag}
                                            currentPage={currentPage} setCurrentPage={setCurrentPage}/>}
                        rightChildren={<TagsBlock items={popularTags} isLoading={isFetching} query={selectedTag}/>}/>
    );
});

const mapStateToProps = (state: RootState) => ({
    isOwner: false,
    isMainPage: true,
    userId: '',
    isFavorite: false
});


const GenericLayout = compose<React.ComponentType & IPostPage>(connect(mapStateToProps), withAuthRedirect)(PostPage);
export {PostPage, GenericLayout};
