import React, {Dispatch, SetStateAction} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {Box, Chip, Fab, Grid} from '@mui/material';
import Stack from '@mui/material/Stack';
import {useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {getIsAuth} from "../../../redux/auth/auth-selectors";
import {getDataLength, getPopularPosts, getPosts} from '../../../redux/posts/posts-selectors';
import {IPost} from '../../../types/types';
import CustomPagination from '../../Common/Pagination/CustomPagination';
import {PopularPost} from '../PostCard/PopularPost';
import {PostCard} from '../PostCard/PostCard';
import {PostSkeleton} from '../PostCard/PostSkeleton';
import PostCarousel from '../PostCarousel';
import PostFilter from './PostFilter';

type IPostMain = {
    isFetching: boolean,
    isMainPage: boolean,
    selectedTag: string | null,
    setSearchValue: Dispatch<SetStateAction<string>>,
    setTabIndex: Dispatch<SetStateAction<number>>,
    setSelectedTag: Dispatch<SetStateAction<string | null>>,
    setCurrentPage: Dispatch<SetStateAction<number>>,
    currentPage: number
}

const PostMain: React.FC<IPostMain> = (props, context) => {

    const posts = useSelector(getPosts);
    const popularPosts = useSelector(getPopularPosts);
    const dataLength = useSelector(getDataLength);
    const isAuth = useSelector(getIsAuth);

    const navigate = useNavigate();

    const handleDelete = () => {
        props.setSelectedTag(null);
        navigate('/');
    }

    return (
        <div style={{position: 'relative'}}>
            {props.isMainPage && <PostFilter setSearchValue={props.setSearchValue} setTabIndex={props.setTabIndex}/>}


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
                  style={{marginTop: '20px', marginBottom: '100px'}}>

                {props.isFetching
                    ? [...Array(props.isMainPage ? 6 : 2)].map((value, index) =>
                        <Grid item xs={12} sm={12} md={props.isMainPage ? 6 : 12} key={index}>
                            <PostSkeleton key={index}/>
                        </Grid>)
                    : !!posts.length
                        ? posts.map((el: IPost) =>
                            <Grid item xs={12} sm={12} md={props.isMainPage ? 6 : 12} key={el._id}>
                                {el.author &&
                                    <PostCard key={el._id} isMain={false} post={el}
                                              avatarAbbr={el.author?.firstName?.substring(0, 1).toUpperCase() || 'U'}/>}
                            </Grid>
                        )
                        : <div style={{margin: '0 auto'}}>
                            К сожалению, список публикаций пуст :(
                        </div>
                }

                {props.isMainPage && isAuth && <Link to='/add-post'>
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
