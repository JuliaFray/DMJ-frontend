import React, {useEffect, useState} from 'react';
import {compose} from 'redux';
import {connect, useDispatch, useSelector} from 'react-redux';
import {getIsFetching, getTags} from '../../../redux/posts/posts-selectors';
import {getAllPosts, getLastTags, getPopularPost} from '../../../redux/posts/posts-thunks';
import withAuthRedirect from '../../HOC/withAuthRedirect';
import {RootState} from '../../../redux/redux-store';
import {createQueryString, useQueryParams} from '../../../hook/hooks';
import PageLayout from '../../Common/PageLayout';
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
    const tags = useSelector(getTags);

    const {queryParams, setQueryParams} = useQueryParams({tags: ''});

    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [fetchNew, setFetchNew] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('');

    const dispatch = useDispatch();

    useEffect(() => {
        if(!props.isOwner) {
            dispatch(getLastTags({}))
        }
    }, [dispatch, props.isOwner, props.isFavorite, props.userId])

    useEffect(() => {
        const tag = queryParams.tags?.toString();
        setSelectedTag(tag);

        const query = {
            userId: props.userId,
            isFavorite: JSON.stringify(props.isFavorite),
            tags: tags.find(it => it.value === tag)?._id || '',
            isBest: JSON.stringify(fetchNew),
            filter: filter
        }

        dispatch(getAllPosts({query: createQueryString(query)}));

        if(!props.userId && !tag) {
            dispatch(getPopularPost({}));
        }
    }, [queryParams, fetchNew, filter])

    return (
        <PageLayout isMainPage={props.isMainPage}
                    mainChildren={<PostMain isMainPage={props.isMainPage} isFetching={isFetching}
                                            selectedTag={selectedTag} setFilter={setFilter}
                                            setFetchNew={setFetchNew} setSelectedTag={setSelectedTag}/>}
                    rightChildren={<TagsBlock items={tags} isLoading={isFetching} query={selectedTag}/>}/>
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
