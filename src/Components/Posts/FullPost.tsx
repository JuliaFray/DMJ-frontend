import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../hook/hooks';
import {getOnePost} from '../../redux/posts/posts-thunks';
import {Post} from './Post/Post';
import {CommentsBlock} from './Comments/CommentsBlock';
import {AddCommentComponent} from './Comments/AddComment/AddCommentComponent';
import withAuthRedirect from '../HOC/withAuthRedirect';
import {compose} from 'redux';
import {useSelector} from 'react-redux';
import {getIsFetching, getPost} from '../../redux/posts/posts-selectors';
import {getUserId} from '../../redux/users/users-selectors';
import {getAuthId} from '../../redux/auth/auth-selectors';

const FullPost: React.FC = React.memo(() => {

    const {id} = useParams();
    const dispatch = useAppDispatch();
    const isFetching = useSelector(getIsFetching)
    const post = useSelector(getPost);
    const userId = useSelector(getAuthId)

    useEffect(() => {
        if(id) {
            dispatch(getOnePost({postId: id}));
        }
    }, [id])

    return (
        <>
            {post && <Post post={post} isFullPost isLoading={isFetching} isEditable={post.author._id === userId}/>}
            {post && <CommentsBlock items={post.comments} isLoading={isFetching}>
                <AddCommentComponent postId={post._id}/>
            </CommentsBlock>
            }

        </>
    );
});

export default compose<React.ComponentType>(withAuthRedirect)(FullPost);
