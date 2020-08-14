import React from 'react';
// import StyleSheet from './Profile.module.css';
import Description from './Description/Description';
import PostsContainer from './Posts/PostsContainer';



const Profile = (props) => {
  // debugger
 
  return (
    <div>
      {/* <img src='https://jssors8.azureedge.net/demos/image-slider/img/faded-monaco-scenery-evening-dark-picjumbo-com-image.jpg' /> */}
      <Description profile={props.profile} status = {props.status} updateUserStatus = {props.updateUserStatus} />
      <PostsContainer
        postsData={props.posts}
      />
    </div>
  );
};

export default Profile;