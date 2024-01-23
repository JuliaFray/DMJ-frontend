import React from 'react';
import StyleSheet from './Post.module.css';
import {PostType} from '../../../../types/types';

type PropsType = {
    post: PostType,
}

const Post: React.FC<PropsType> = ({post}) => {
    return (
        <div className={StyleSheet.post}>

            <img src={post?.imageUrl?.includes('http')
                ? post.imageUrl : `http://localhost:8000${post.imageUrl}`} alt="Uploaded"/>
            {/*<img alt='userAvatar' src='https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png'/>*/}

            {post.title}

            <div className={StyleSheet.postItem}>
                {post.text}
            </div>

            <div className={StyleSheet.quality}>
                {/*<span>Like {post.like}</span>*/}
                {/*<span>Dislike {post.dislike}</span>*/}
                <span>Просмотры {post.viewsCount}</span>
            </div>

        </div>
    )
}

export default Post;
