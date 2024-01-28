import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getIsAuth, getIsFetching} from '../../redux/auth/auth-selectors';
import {getPosts} from '../../redux/posts/posts-selectors';
import {getAllPosts} from '../../redux/posts/posts-thunks';
import {PostType} from '../../types/types';
import {PostCard} from './PostCard/PostCard';
import {Fab, Grid} from '@mui/material';
import {PostSkeleton} from './PostSkeleton';
import EditIcon from '@mui/icons-material/Edit';
import {Link, Navigate} from 'react-router-dom';

const PostPage: React.FC = React.memo(() => {

    const isAuth = useSelector(getIsAuth);
    const isFetching = useSelector(getIsFetching);
    const posts = useSelector(getPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts({}));
    }, [])

    let mappedPost = posts.map((el: PostType) =>
        <Grid item xs={6} key={el._id}>
            <PostCard key={el._id} post={el} avatarAbbr={el.author?.fullName.substring(0, 1).toUpperCase() || 'U'}/>
        </Grid>
    );

    const loadingPost = [...Array(6)].map((value, index) =>
        <Grid item xs={6} key={index}>
            <PostSkeleton key={index}/>
        </Grid>
    )

    if(!isAuth) {
        return <Navigate to="/login"/>
    }

    return (
        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} style={{marginTop: "20px"}}>
            {isFetching ? loadingPost : mappedPost}
            <Link to='/add-post'>
                <Fab color="primary"
                     aria-label="edit"
                     style={{position: 'fixed', bottom: '20px', right: '20px'}}>
                    <EditIcon/>
                </Fab>
            </Link>

        </Grid>
    );
});

export default PostPage;
