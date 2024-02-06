import React, {useEffect} from 'react';
import {compose} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {Link, NavLink} from 'react-router-dom';
import {Box, Fab, Grid, styled, Tooltip, Typography, useTheme} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import {DoubleArrow} from '@mui/icons-material';
import {getIsFetching} from '../../redux/auth/auth-selectors';
import {getPost, getPosts} from '../../redux/posts/posts-selectors';
import {getAllPosts, getPopularPost} from '../../redux/posts/posts-thunks';
import {PostType} from '../../types/types';
import {PostCard} from './PostCard/PostCard';
import {PostSkeleton} from './PostSkeleton';
import withAuthRedirect from '../HOC/withAuthRedirect';
import styles from './PostPage.module.scss';
import Paper from '@mui/material/Paper';
import {SideBlock} from '../Common/SideBlock/SideBlockComponent';

const PostPage: React.FC = React.memo(() => {

    const isFetching = useSelector(getIsFetching);
    const posts = useSelector(getPosts);
    const popularPost = useSelector(getPost);
    const dispatch = useDispatch();
    const theme = useTheme();

    useEffect(() => {
        dispatch(getAllPosts({}));
        dispatch(getPopularPost({}));
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


    const Item = styled(Paper)(({theme: any}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Grid container spacing={3} className={styles.posts}>
            <Grid item xs></Grid>

            <Grid item xs={6}>
                {popularPost && <Card
                    sx={{
                        height: 250,
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
                    <Box sx={{display: 'flex', flexDirection: 'column', width: 400}}>
                        <CardContent sx={{flex: '1 0 auto'}}>
                            <Typography variant="h3" component="div">
                                {popularPost.title}
                            </Typography>
                            <Typography variant="body2">
                                {popularPost.text.substring(0, 200)}...
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
                            <img style={{width: '100%', height: 300}}
                                 src={popularPost.imageUrl}
                                 alt='Uploaded'
                            />
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

            <Grid item xs>
                <SideBlock title={'Тэги'} children={<Item/>}/>
            </Grid>

        </Grid>
    );
});

export default compose<React.ComponentType>(withAuthRedirect)(PostPage);
