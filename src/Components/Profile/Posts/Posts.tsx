import React from 'react';
import Post from './Post/Post';
import StyleSheet from './Posts.module.css'
import SendPost from './SendPost/SendPostContainer';
import {PostType} from "../../../types/types";
import {FormDataType} from './SendPost/SendPost';

type PropsType = {
    postsData: Array<PostType>,
    sendPost: (text: string) => void
}

const Posts: React.FC<PropsType> = React.memo(props => {

    let messages = props.postsData.map(el => <Post key={el.id} message={el.message} like={el.like} dislike={el.dislike}/>);

    let addNewPost = (values: FormDataType) => {
        props.sendPost(values.newPostText)
    };


    return (
        <div className={StyleSheet.posts}>
            <SendPost onSubmit={addNewPost}/>
            <span>My Posts</span>
            <div className={StyleSheet.postItems}>
                {messages}
            </div>
        </div>
    );
});

export default Posts;
