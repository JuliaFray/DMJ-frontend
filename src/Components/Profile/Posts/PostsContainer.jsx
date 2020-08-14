import React from 'react';
import { connect } from 'react-redux';
import Preloader from './../../Common/Preloader/Preloader';
import withAithRedirect from './../../HOC/WithAuthRedirect'
import { compose } from 'redux';
import { addPostActionCreator } from './../../../redux/profile-reducer';
import Posts from './Posts';

class PostsContainer extends React.Component {
  render() {
    return <>
      {this.props.isFetching ? <Preloader /> : null}
      <Posts 
        sengPost={this.props.sengPost}
        postsData = {this.props.postsData}
       />
    </>
  }
};

let mapStateToProps = (state) => ({
  posts: state.profilePage.posts
});

let mapDispatchToProps = (dispatch) => {
  return {
      sengPost: (message) => {
          dispatch(addPostActionCreator(message))
      }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAithRedirect
)(PostsContainer);
