import React, {Dispatch, SetStateAction} from 'react';
import PostFilter from './PostFilter';
import {Box, Chip, Fab, Grid} from '@mui/material';
import Stack from '@mui/material/Stack';
import {PostSkeleton} from '../PostCard/PostSkeleton';
import {IPost} from '../../../types/types';
import {PostCard} from '../PostCard/PostCard';
import {Link, useNavigate} from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import {useSelector} from 'react-redux';
import {getDataLength, getPopularPosts, getPosts} from '../../../redux/posts/posts-selectors';
import CustomPagination from '../../Common/Pagination/CustomPagination';
import PostCarousel from '../PostCarousel';
import {PopularPost} from '../PostCard/PopularPost';

type IPostMain = {
    isFetching: boolean,
    isMainPage: boolean,
    selectedTag: string | null,
    setFilter: Dispatch<SetStateAction<string>>,
    setFetchNew: Dispatch<SetStateAction<boolean>>,
    setSelectedTag: Dispatch<SetStateAction<string | null>>,
    setCurrentPage: Dispatch<SetStateAction<number>>,
    currentPage: number
}

const PostMain: React.FC<IPostMain> = (props, context) => {

    const posts = useSelector(getPosts);
    const popularPosts = useSelector(getPopularPosts);
    const dataLength = useSelector(getDataLength);

    const navigate = useNavigate();

    const handleDelete = () => {
        props.setSelectedTag(null);
        navigate('/posts');
    }

    return (
        <div style={{position: 'relative'}}>
            {props.isMainPage && <PostFilter onFilterChange={props.setFilter} onTabChange={props.setFetchNew}/>}

            {!!popularPosts.length && <PostCarousel posts={popularPosts}>
                {popularPosts.map(item => <PopularPost key={item._id} post={item}/>)}
            </PostCarousel>}

            {props.selectedTag &&
                <Box>
                    <Stack direction='row' spacing={1}>
                        <Chip color='info' variant='filled' label={props.selectedTag} onDelete={handleDelete}/>
                    </Stack>
                </Box>
            }

            <Grid container sx={{margin: 0}}
                  rowSpacing={{xs: 1, sm: 2, md: 3}}
                  columnSpacing={{xs: 1, sm: 2, md: 3}}
                  style={{marginTop: '20px', marginBottom: '20px'}}>

                {props.isFetching
                    ? [...Array(props.isMainPage ? 6 : 2)].map((value, index) =>
                        <Grid item xs={12} sm={12} md={props.isMainPage ? 6 : 12} key={index}>
                            <PostSkeleton key={index}/>
                        </Grid>)
                    : posts.map((el: IPost) =>
                        <Grid item xs={12} sm={12} md={props.isMainPage ? 6 : 12} key={el._id}>
                            {el.author && <PostCard key={el._id} isMain={false} post={el} avatarAbbr={el.author?.firstName?.substring(0, 1).toUpperCase() || 'U'}/>}
                        </Grid>
                    )}

                {props.isMainPage && <Link to='/add-post'>
                    <Fab color='primary'
                         aria-label='edit'
                         style={{position: 'fixed', bottom: '20px', right: '20px'}}>
                        <EditIcon/>
                    </Fab>
                </Link>}

            </Grid>

            <CustomPagination page={props.currentPage} dataLength={dataLength} setCurrentPage={props.setCurrentPage}/>
        </div>
    );
}

export default PostMain;
