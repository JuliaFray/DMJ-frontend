import React, {Dispatch, SetStateAction} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {Fab, Grid} from '@mui/material';
import {TArticle} from 'entities/article';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getIsAuth} from "shared/model/auth/auth-selectors";
import {getPosts} from 'shared/model/posts/posts-selectors';
import {ArticleCard} from 'widgets/article-card/article-card.ui';
import {ArticlesFeedSkeleton} from "widgets/articles-feed/articles-feed.skeleton";

type IPostMain = {
    isFetching: boolean,
    isMainPage: boolean,
    setSearchValue: Dispatch<SetStateAction<string>>,
    setTabIndex: Dispatch<SetStateAction<number>>,
    setCurrentPage: Dispatch<SetStateAction<number>>,
    currentPage: number
}

export const ArticlesFeed: React.FC<IPostMain> = (props) => {

    const posts = useSelector(getPosts);
    const isAuth = useSelector(getIsAuth);

    return (
        <div style={{position: 'relative'}}>
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
