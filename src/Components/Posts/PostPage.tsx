import React, {useEffect} from 'react';
import {compose} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {Link, NavLink} from 'react-router-dom';
import {Box, Fab, Grid, Tooltip, Typography, useTheme} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import {DoubleArrow} from '@mui/icons-material';
import {getIsFetching, getLastFetchedTags, getPost, getPosts} from '../../redux/posts/posts-selectors';
import {getAllPosts, getLastTags, getPopularPost} from '../../redux/posts/posts-thunks';
import {IPost} from '../../types/types';
import {PostCard} from './PostCard/PostCard';
import {PostSkeleton} from './PostSkeleton';
import withAuthRedirect from '../HOC/withAuthRedirect';
import styles from './PostPage.module.scss';
import {TagsBlock} from './TagsBlock';
import {BASE_URL} from '../../api/api';

const PostPage: React.FC = React.memo(() => {

    const isFetching = useSelector(getIsFetching);
    const posts = useSelector(getPosts);
    const popularPost = useSelector(getPost);
    const tags = useSelector(getLastFetchedTags);
    const dispatch = useDispatch();
    const theme = useTheme();

    useEffect(() => {
        dispatch(getAllPosts({}));
        dispatch(getPopularPost({}));
        dispatch(getLastTags({}))
    }, [])

    let mappedPost = posts.map((el: IPost) =>
        <Grid item md={6} key={el._id}>
            <PostCard key={el._id} post={el} avatarAbbr={el.author?.firstName?.substring(0, 1).toUpperCase() || 'U'}/>
        </Grid>
    );

    const loadingPost = [...Array(6)].map((value, index) =>
        <Grid item xs={6} key={index}>
            <PostSkeleton key={index}/>
        </Grid>
    )

    return (
        <Grid container spacing={3} className={styles.posts}>
            <Grid item md={1}></Grid>

            <Grid item md={8}>
                {popularPost && <Card
                    sx={{
                        height: 300,
                        mx: 'auto',
                        margin: 0,
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '4px',
                        boxShadow: `0 8px 24px ${theme.palette.grey[400]}`,
                        transition: 'transform 0.15s ease-in-out',
                        display: 'flex'
                    }}
                >
                    <Box sx={{display: 'flex', flexDirection: 'column', width: 750}}>
                        <CardContent sx={{flex: '1 0 auto'}}>
                            <Typography variant="h4" component="div">
                                {popularPost.title}
                            </Typography>
                            <Typography variant="body2">
                                {popularPost.text?.substring(0, 100)}...
                            </Typography>
                        </CardContent>

                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                opacity: 0.1,
                                transition: 'opacity 0.3s ease-in-out',
                                '&:hover': {
                                    opacity: 0.2,
                                }
                            }}
                        >
                            {popularPost.imageUrl &&
                                <img style={{
                                    width: '100%',
                                    height: 300,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover'
                                }}
                                     src={popularPost.imageUrl.includes('http')
                                         ? popularPost.imageUrl : `${BASE_URL}${popularPost.imageUrl}`} alt="Uploaded"
                                />}
                        </Box>

                    </Box>

                    <Box sx={{width: '100%', display: 'flex', alignItems: 'end', pl: 1, pb: 1, justifyContent: 'end'}}>
                        <NavLink to={`/posts/${popularPost._id}`}>
                            <Tooltip title="Читать далее">
                                <IconButton aria-label="forward">
                                    <DoubleArrow/>
                                </IconButton>
                            </Tooltip>
                        </NavLink>
                    </Box>

                </Card>}

                <Grid container rowSpacing={1} columnSpacing={{xs: 2, sm: 4, md: 6}}
                      sx={{margin: 0}}
                      style={{marginTop: "20px"}}>
                    {isFetching ? loadingPost : mappedPost}
                    <Link to='/add-post'>
                        <Fab color="primary"
                             aria-label="edit"
                             style={{position: 'fixed', bottom: '20px', right: '20px'}}>
                            <EditIcon/>
                        </Fab>
                    </Link>

                </Grid>
            </Grid>

            <Grid item md={3}>
                <TagsBlock items={tags} isLoading={isFetching}/>
            </Grid>

        </Grid>
    );
});

export default compose<React.ComponentType>(withAuthRedirect)(PostPage);
