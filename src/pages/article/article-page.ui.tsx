import React, {useEffect} from 'react';
import {Grid} from '@mui/material';
import {Article} from 'entities/article/article.ui';
import {CreateComment} from 'features';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from 'shared/hook/hooks';
import {getAuthId, getIsAuth} from 'shared/model/auth/auth-selectors';
import {getIsFetching, getPost, getRecommendations} from 'shared/model/posts/posts-selectors';
import {getOnePost, getRecommendationPost} from 'shared/model/posts/posts-thunks';
import {CommentsBlock} from 'widgets';
import {Recommendations} from 'widgets';
import styles from "./article-page.module.scss";

export const ArticlePage: React.FC = React.memo(() => {

    const {id} = useParams();
    const dispatch = useAppDispatch();
    const isFetching = useSelector(getIsFetching)
    const post = useSelector(getPost);
    const userId = useSelector(getAuthId)
    const recommendations = useSelector(getRecommendations);
    const isAuth = useSelector(getIsAuth)

    const mdMain = 9;
    const mdSide = 3;

    useEffect(() => {
        if(id) {
            dispatch(getOnePost({postId: id}));
            dispatch(getRecommendationPost({originPostId: id}));
        }
    }, [id])

    return (
        <Grid container spacing={2}>
            <Grid item md={mdMain}>
                {post && <Article post={post} isFullPost isLoading={isFetching}
                                  isEditable={post.author._id === userId}/>
                }

                {post &&
                    <CommentsBlock items={post.comments} isLoading={isFetching}>
                        {isAuth && <CreateComment postId={post._id}/>}
                    </CommentsBlock>
                }
            </Grid>

            <Grid item md={mdSide} className={styles.right}>
                <Recommendations posts={recommendations}/>
            </Grid>
        </Grid>
    );
});
