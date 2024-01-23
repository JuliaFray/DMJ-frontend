import React, {useEffect} from 'react';
import Post from './Post/Post';
import StyleSheet from './Posts.module.css'
import SendPost from './SendPostForm/SendPostContainer';
import {useDispatch, useSelector} from 'react-redux';
import {getIsFetching} from '../../../redux/auth-selectors';
import {getProfilePosts} from '../../../redux/profile-selectors';
import Preloader from '../../Common/Preloader/Preloader';
import {getUserPosts} from '../../../redux/profile-reducer';

const Posts: React.FC = React.memo(() => {

    const isFetching = useSelector(getIsFetching);
    const posts = useSelector(getProfilePosts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserPosts());
    }, [])

    let mappedPost = posts.map(el => <Post key={el.id} post={el}/>);

    return (
        <>
            {isFetching ? <Preloader/> : null}
            <div className={StyleSheet.posts}>
                <SendPost/>
                <span>Блог</span>
                <div className={StyleSheet.postItems}>
                    {mappedPost}
                </div>
            </div>
        </>
    );
});

export default Posts;
