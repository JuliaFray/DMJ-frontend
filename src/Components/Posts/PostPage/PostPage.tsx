import React, {useEffect, useState} from 'react';
import {compose} from 'redux';
import {connect, useDispatch, useSelector} from 'react-redux';
import {getFetchedPopularTags, getIsFetching} from '../../../redux/posts/posts-selectors';
import {getAllPosts, getPopularPost, getPopularTags} from '../../../redux/posts/posts-thunks';
import withAuthRedirect from '../../HOC/withAuthRedirect';
import {RootState} from '../../../redux/redux-store';
import {createQueryString, useQueryParams} from '../../../hook/hooks';
import PageLayout from '../../Common/PageLayout/PageLayout';
import PostMain from './PostMain';
import TagsBlock from './TagsBlock';
import {getAuthId} from '../../../redux/auth/auth-selectors';

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
            tags: popularTags.find(it => it.value === tag)?._id || '',
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

    return (
        <PageLayout isMainPage={props.isMainPage}
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

export {PostPage};

export default compose<React.ComponentType & IPostPage>(connect(mapStateToProps), withAuthRedirect)(PostPage);
