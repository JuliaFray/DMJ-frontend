import React from 'react';
// import { PureComponent } from 'react';
import Post from './Post/Post';
import StyleSheet from './Posts.module.css'
import SendPost from './SendPost/SendPostContainer';

const Posts = React.memo(props => {

  let messages = props.postsData.map(el => <Post message={el.message} like={el.like} dislike={el.dislike} />);

  let addNewPost = (values) => {
    props.sengPost(values.posts)
  }


  return (
    <div className={StyleSheet.posts}>
      <SendPost onSubmit={addNewPost} />
      <span>My Posts</span>
      <div className={StyleSheet.postItems}>
        {messages}
      </div>

    </div>

  );

});

export default Posts;