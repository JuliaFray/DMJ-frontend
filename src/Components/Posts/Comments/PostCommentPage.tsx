import React, {useEffect} from 'react';
import List from '@mui/material/List';
import {useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {useAppDispatch} from '../../../hook/hooks';
import {getPostComments} from '../../../redux/posts/posts-selectors';
import {getUserPostComments} from '../../../redux/posts/posts-thunks';
import {IComment, IPost} from '../../../types/types';
import PageLayout from '../../Common/PageLayout/PageLayout';
import {PostCard} from '../PostCard/PostCard';
import {CommentItem} from './CommentsBlock';

type IPostCommentPage = {
    userId: string
}

const PostCommentPage: React.FC<IPostCommentPage> = (props, context) => {
    const dispatch = useAppDispatch();

    const postComments = useSelector(getPostComments);

    useEffect(() => {
        dispatch(getUserPostComments({userId: props.userId}))
    }, [])

    return (
        <PageLayout isMainPage={false}
                    mainChildren={<div>{postComments.map(it => <PostCommentItem item={it}/>)}</div>}
        />
    );
}

const PostCommentItem: React.FC<{ item: IPost }> = (props, context) => {
    return (
        <div>
            <PostCard key={props.item._id} isMain={false} isComments={true}
                      post={props.item} avatarAbbr={props.item.author?.firstName?.substring(0, 1).toUpperCase() || 'U'}/>
            <List>
                {props.item.comments.map((obj: IComment) => (
                    <CommentItem key={uuidv4()} item={obj} isLoading={false}/>
                ))}
            </List>
        </div>
    )
}


export default PostCommentPage;
