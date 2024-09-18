import React, {Dispatch, SetStateAction} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {Box, Chip, Fab, Grid} from '@mui/material';
import Stack from '@mui/material/Stack';
import {ArticleSkeleton, TArticle} from 'entities/article';
import {useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {getIsAuth} from "shared/model/auth/auth-selectors";
import {getPosts} from 'shared/model/posts/posts-selectors';
import {ArticleCard} from 'widgets/article-card/article-card.ui';
import {ArticlesFeedSkeleton} from "widgets/articles-feed/articles-feed.skeleton";

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

export const ArticlesFeed: React.FC<IPostMain> = (props, context) => {

    const posts = useSelector(getPosts);
    const isAuth = useSelector(getIsAuth);

    const navigate = useNavigate();

    const handleDelete = () => {
        props.setSelectedTag(null);
        navigate('/');
    }

    return (
        <div style={{position: 'relative'}}>
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
                  style={{marginTop: '-10px', marginBottom: '30px'}}>

                {props.isFetching
                    ? <ArticlesFeedSkeleton/>
                    : !!posts.length
                        ? posts.map((el: TArticle) =>
                            <Grid item xs={12} sm={12} md={12} key={el._id}>
                                {el.author &&
                                    <ArticleCard key={el._id} isMain={false} post={el}
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

        </div>
    );
}
