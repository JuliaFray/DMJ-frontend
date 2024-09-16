import React, {useEffect} from 'react';
import List from '@mui/material/List';
import {TArticle} from 'entities/article';
import {Comment, TComment} from 'entities/comment';
import {useSelector} from 'react-redux';
import {useAppDispatch} from 'shared/hook/hooks';
import {getPostComments} from 'shared/model/posts/posts-selectors';
import {getUserPostComments} from 'shared/model/posts/posts-thunks';
import CommonLayoutUi from 'pages/layouts/common-layout.ui';
import {v4 as uuidv4} from 'uuid';
import {ArticleCard} from 'widgets/article-card/article-card.ui';

type IPostCommentPage = {
    userId: string
}

export const CommentsFeed: React.FC<IPostCommentPage> = (props, context) => {
    const dispatch = useAppDispatch();

    const postComments = useSelector(getPostComments);

    useEffect(() => {
        dispatch(getUserPostComments({userId: props.userId}))
    }, [])

    return (
        <CommonLayoutUi isMainPage={false}
                        mainChildren={<div>{postComments.map((it: TArticle) => <PostCommentItem item={it}/>)}</div>}
        />
    );
}

const PostCommentItem: React.FC<{ item: TArticle }> = (props, context) => {
    return (
        <div>
            <ArticleCard key={props.item._id} isMain={false} isComments={true}
                         post={props.item} avatarAbbr={props.item.author?.firstName?.substring(0, 1).toUpperCase() || 'U'}/>
            <List>
                {props.item.comments.map((obj: TComment) => (
                    <Comment key={uuidv4()} item={obj} isLoading={false}/>
                ))}
            </List>
        </div>
    )
}
