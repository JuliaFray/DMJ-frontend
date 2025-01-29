import React, {useEffect} from "react";

import {CreateComment} from "features";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {CommentsBlock, Recommendations} from "widgets";

import {Grid, useMediaQuery} from "@mui/material";

import {useAppDispatch} from "shared/hook/hooks";
import {getAuthId, getIsAuth} from "shared/model/auth/auth-selectors";
import {getPost, getPostsIsFetching, getRecommendations,} from "shared/model/posts/posts-selectors";
import {getOnePost, getRecommendationPost,} from "shared/model/posts/posts-thunks";
import {theme} from "shared/themes/theme";

import {Article} from "entities/article/article.ui";

import styles from "./article-page.module.scss";

export const ArticlePage: React.FC = React.memo(() => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const isFetching = useSelector(getPostsIsFetching);
    const post = useSelector(getPost);
    const userId = useSelector(getAuthId);
    const recommendations = useSelector(getRecommendations);
    const isAuth = useSelector(getIsAuth);

    const isMore1200px = useMediaQuery(theme.breakpoints.up("lg"));
    const mdMain = isMore1200px ? 9 : 12;
    const mdSide = 3;

    useEffect(() => {
        if(id) {
            dispatch(getOnePost({postId: id}));
            dispatch(getRecommendationPost({originPostId: id}));
        }
    }, [id]);

    return (
        <Grid container spacing={2}>
            <Grid item md={mdMain}>
                {post && (
                    <Article
                        post={post}
                        isFullPost
                        isLoading={isFetching}
                        isEditable={post.author._id === userId}
                    />
                )}

                {post && (
                    <CommentsBlock items={post.comments} isLoading={isFetching}>
                        {isAuth && <CreateComment postId={post._id}/>}
                    </CommentsBlock>
                )}
            </Grid>

            <Grid item md={mdSide} className={styles.right}>
                <Recommendations posts={recommendations}/>
            </Grid>
        </Grid>
    );
});
