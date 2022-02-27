import React from 'react';
import Post from './Post/Post';
import StyleSheet from './Posts.module.css'
import SendPost from './SendPostForm/SendPostContainer';
import {useSelector} from 'react-redux';
import {getIsFetching} from '../../../redux/auth-selectors';
import {getProfilePosts} from '../../../redux/profile-selectors';
import Preloader from '../../Common/Preloader/Preloader';

const Posts: React.FC = React.memo(() => {

    const isFetching = useSelector(getIsFetching);
    const posts = useSelector(getProfilePosts);

    let mappedPost = posts.map(el => <Post key={el.id} message={el.message} like={el.like} dislike={el.dislike}/>);

    return (
        <>
            {isFetching ? <Preloader/> : null}
            <div className={StyleSheet.posts}>
                <SendPost/>
                <span>My Posts</span>
                <div className={StyleSheet.postItems}>
                    {mappedPost}
                </div>
            </div>
        </>
    );
});

export default Posts;
