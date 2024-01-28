import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../hook/hooks';
import {getOnePost} from '../../redux/posts/posts-thunks';
import {Post} from './Post/Post';
import {CommentsBlock} from './Comments/CommentsBlock';
import {AddCommentComponent} from './Comments/AddComment/AddCommentComponent';

export const FullPost = () => {

    const {id} = useParams();
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            dispatch(getOnePost({postId: id}))
                .then(res => {
                    setData(res.payload);
                    setIsLoading(false);
                });
        }
    }, [id])

    return (
        <>
            {!!data && <Post post={data} isFullPost isLoading={isLoading} isEditable={false}/>}
            <CommentsBlock
                items={[
                    {
                        user: {
                            fullName: "Вася Пупкин",
                            avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                        },
                        text: "Это тестовый комментарий 555555",
                    },
                    {
                        user: {
                            fullName: "Иван Иванов",
                            avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                        },
                        text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
                    },
                ]}
                isLoading={isLoading}
            >
                <AddCommentComponent/>
            </CommentsBlock>
        </>
    );
};
