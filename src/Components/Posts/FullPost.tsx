import React, {useEffect} from 'react';
import {Article} from 'entities/article/article.ui';
import {CreateComment} from 'features';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {compose} from 'redux';
import {useAppDispatch} from 'shared/hook/hooks';
import {withAuthRedirect} from 'shared/lib/react/react.hoc';
import {getAuthId} from 'shared/model/auth/auth-selectors';
import {getIsFetching, getPost, getRecommendations} from 'shared/model/posts/posts-selectors';
import {getOnePost, getRecommendationPost} from 'shared/model/posts/posts-thunks';
import CommonLayoutUi from 'shared/ui/layouts/common-layout.ui';
import {CommentsBlock} from 'widgets/comment-block/comment-block.ui';
import Recommendations from 'widgets/recommendations/Recommendations';

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
        <CommonLayoutUi isMainPage
                        mainChildren={<>
                            {post && <Article post={post} isFullPost isLoading={isFetching}
                                              isEditable={post.author._id === userId}/>
                            }
                            {post &&
                                <CommentsBlock items={post.comments} isLoading={isFetching}>
                                    <CreateComment postId={post._id}/>
                                </CommentsBlock>
                            }

                        </>}
                        rightChildren={<Recommendations posts={recommendations}/>}
        />


    );
});

export default compose<React.ComponentType>(withAuthRedirect)(FullPost);
