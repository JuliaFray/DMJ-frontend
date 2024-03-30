import React, {useEffect, useState} from 'react';
import {compose} from 'redux';
import {connect, useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {Box, Chip, Fab, Grid} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import styles from './PostPage.module.scss';
import {getIsFetching, getLastFetchedTags, getPost, getPosts} from '../../redux/posts/posts-selectors';
import {getAllPosts, getLastTags, getPopularPost} from '../../redux/posts/posts-thunks';
import {IPost} from '../../types/types';
import {PostCard} from './PostCard/PostCard';
import {PostSkeleton} from './PostSkeleton';
import withAuthRedirect from '../HOC/withAuthRedirect';
import {TagsBlock} from './TagsBlock';
import Stack from '@mui/material/Stack';
import {RootState} from '../../redux/redux-store';
import {createQueryString, useQueryParams} from '../../hook/hooks';
import {PopularPost} from './PopularPost';

export type IPostPage = {
    isOwner: boolean,
    isMainPage: boolean,
    userId: string | '',
    isFavorite: boolean,
    text: string
}
const PostPage: React.FC<IPostPage> = React.memo((props, context) => {

    const isFetching = useSelector(getIsFetching);
    const posts = useSelector(getPosts);
    const popularPost = useSelector(getPost);
    const tags = useSelector(getLastFetchedTags);

    const {queryParams, setQueryParams} = useQueryParams({tags: ''});

    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!props.isOwner) {
            dispatch(getLastTags({}))
        }
    }, [dispatch])

    useEffect(() => {
        const tag = queryParams.tags?.toString();
        setSelectedTag(tag);

        const query = {
            userId: props.userId,
            isFavorite: props.isFavorite ? 1 : 0,
            tags: tag
        }

        dispatch(getAllPosts({query: createQueryString(query)}));

        if(!props.userId && !tag) {
            dispatch(getPopularPost({}));
        }
    }, [queryParams])

    const handleDelete = () => {
        setSelectedTag(null);
        navigate('/posts');
    }

    return (
        <Grid container spacing={3} className={styles.posts}>

            {props.isMainPage && <Grid item xs={1}></Grid>}

            <Grid item xs={props.isMainPage ? 8 : 12}>
                {popularPost && <PopularPost post={popularPost}/>}

                {selectedTag &&
                    <Box>
                        <Stack direction="row" spacing={1}>
                            <Chip variant="outlined" label={selectedTag} onDelete={handleDelete}/>
                        </Stack>
                    </Box>
                }

                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}
                      sx={{margin: 0}} style={{marginTop: "20px"}}>

                    {isFetching
                        ? [...Array(6)].map((value, index) =>
                            <Grid item xs={6} key={index}>
                                <PostSkeleton key={index}/>
                            </Grid>)
                        : posts.map((el: IPost) =>
                            <Grid item xs={6} key={el._id}>
                                {el.author && <PostCard key={el._id} post={el} avatarAbbr={el.author?.firstName?.substring(0, 1).toUpperCase() || 'U'}/>}
                            </Grid>
                        )}

                    <Link to='/add-post'>
                        <Fab color="primary"
                             aria-label="edit"
                             style={{position: 'fixed', bottom: '20px', right: '20px'}}>
                            <EditIcon/>
                        </Fab>
                    </Link>

                </Grid>
            </Grid>

            {props.isMainPage &&
                <Grid item md={3}>
                    <TagsBlock items={tags} isLoading={isFetching} query={selectedTag}/>
                </Grid>
            }

        </Grid>
    );
});

const mapStateToProps = (state: RootState) => ({
    isOwner: false,
    isMainPage: true,
    userId: '',
    isFavorite: false,
    text: 'postPage'
});

export {PostPage};

export default compose<React.ComponentType & IPostPage>(connect(mapStateToProps), withAuthRedirect)(PostPage);
