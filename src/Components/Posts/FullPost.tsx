import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../hook/hooks';
import {getOnePost, getRecommendationPost} from '../../redux/posts/posts-thunks';
import {Post} from './Post/Post';
import {CommentsBlock} from './Comments/CommentsBlock';
import {AddCommentComponent} from './Comments/AddComment/AddCommentComponent';
import withAuthRedirect from '../HOC/withAuthRedirect';
import {compose} from 'redux';
import {useSelector} from 'react-redux';
import {getIsFetching, getPost, getRecommendations} from '../../redux/posts/posts-selectors';
import {getAuthId} from '../../redux/auth/auth-selectors';
import PageLayout from '../Common/PageLayout/PageLayout';
import Recommendations from './Recommendations/Recommendations';

const FullPost: React.FC = React.memo(() => {

    const {id} = useParams();
    const dispatch = useAppDispatch();
    const isFetching = useSelector(getIsFetching)
    const post = useSelector(getPost);
    const userId = useSelector(getAuthId)
    const recommendations = useSelector(getRecommendations);

    useEffect(() => {
        if(id) {
            dispatch(getOnePost({postId: id}));
            dispatch(getRecommendationPost({originPostId: id}));
        }
    }, [id])

    return (
        <PageLayout isMainPage
                    mainChildren={<>
                        {post && <Post post={post} isFullPost isLoading={isFetching}
                                       isEditable={post.author._id === userId}/>
                        }
                        {post &&
                            <CommentsBlock items={post.comments} isLoading={isFetching}>
                                <AddCommentComponent postId={post._id}/>
                            </CommentsBlock>
                        }

                    </>}
                    rightChildren={<Recommendations posts={recommendations}/>}
        />


    );
});

export default compose<React.ComponentType>(withAuthRedirect)(FullPost);
