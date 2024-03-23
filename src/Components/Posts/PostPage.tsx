import React, {useEffect, useState} from 'react';
import {compose} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Box, Chip, Fab, Grid, Tooltip, Typography, useTheme} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import {DoubleArrow} from '@mui/icons-material';
import styles from './PostPage.module.scss';
import {getIsFetching, getLastFetchedTags, getPost, getPosts} from '../../redux/posts/posts-selectors';
import {getAllPosts, getLastTags, getPopularPost} from '../../redux/posts/posts-thunks';
import {IPost} from '../../types/types';
import {PostCard} from './PostCard/PostCard';
import {PostSkeleton} from './PostSkeleton';
import withAuthRedirect from '../HOC/withAuthRedirect';
import {TagsBlock} from './TagsBlock';
import Stack from '@mui/material/Stack';


const PostPage: React.FC = React.memo(() => {

    const isFetching = useSelector(getIsFetching);
    const posts = useSelector(getPosts);
    const popularPost = useSelector(getPost);
    const tags = useSelector(getLastFetchedTags);

    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const dispatch = useDispatch();
    const theme = useTheme();
    const {search} = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(decodeURIComponent(search)).get('tags');
        setSelectedTag(query);
        dispatch(getAllPosts({query: search}));
        if(!query) {
            dispatch(getPopularPost({}));
        }
        dispatch(getLastTags({}))
    }, [search])

    const handleDelete = () => {
        setSelectedTag(null);
        navigate('/posts');
    }

    return (
        <Grid container spacing={3} className={styles.posts}>
            <Grid item md={1}></Grid>

            <Grid item md={8}>
                {popularPost && <Card sx={{
                    height: 300,
                    mx: 'auto',
                    margin: 0,
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '4px',
                    boxShadow: `0 8px 24px ${theme.palette.grey[400]}`,
                    transition: 'transform 0.15s ease-in-out',
                    display: 'flex'
                }}>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <CardContent sx={{flex: '1 0 auto'}}>
                            <Typography variant="h4" component="div">
                                {popularPost.title}
                            </Typography>
                            <Typography variant="body2">
                                {popularPost.text?.substring(0, 100)}...
                            </Typography>
                        </CardContent>

                        <Box sx={{
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
                        }}>
                            {popularPost?.image?.length && popularPost?.image[0]?.data &&
                                <img style={{
                                    width: '100%',
                                    height: 300,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover'
                                }}
                                     src={`data:image/jpeg;base64,${popularPost.image[0].data}`}
                                />}
                        </Box>

                    </Box>

                    <Box sx={{width: '100%', display: 'flex', alignItems: 'end', pl: 1, pb: 1, justifyContent: 'end'}}>
                        <Link to={`/posts/${popularPost._id}`}>
                            <Tooltip title="Читать далее">
                                <IconButton aria-label="forward">
                                    <DoubleArrow/>
                                </IconButton>
                            </Tooltip>
                        </Link>
                    </Box>

                </Card>}

                {selectedTag && <Box>
                    <Stack direction="row" spacing={1}>
                        <Chip variant="outlined" label={selectedTag} onDelete={handleDelete}/>
                    </Stack>
                </Box>}

                <Grid container rowSpacing={1} columnSpacing={{xs: 2, sm: 4, md: 6}}
                      sx={{margin: 0}}
                      style={{marginTop: "20px"}}>


                    {isFetching
                        ? [...Array(6)].map((value, index) =>
                            <Grid item xs={6} key={index}>
                                <PostSkeleton key={index}/>
                            </Grid>)
                        : posts.map((el: IPost) =>
                            <Grid item md={6} key={el._id}>
                                <PostCard key={el._id} post={el} avatarAbbr={el.author?.firstName?.substring(0, 1).toUpperCase() || 'U'}/>
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

            <Grid item md={3}>
                <TagsBlock items={tags} isLoading={isFetching} query={selectedTag}/>
            </Grid>

        </Grid>
    );
});

export default compose<React.ComponentType>(withAuthRedirect)(PostPage);
