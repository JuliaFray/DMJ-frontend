import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {getProfileTC, getUserStatus, savePhoto, updateUserStatus} from './../../redux/profile-reducer';
import Profile from './Profile';


class ProfileContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizeUserId;
      if (!userId) {
        this.props.history.push('/login')
      }
    }
    this.props.getProfileTC(userId);
    this.props.getUserStatus(userId);
    this.props.updateUserStatus(this.props.status);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }


  render() {
    return (
      <Profile posts={this.props.posts} profile={this.props.profile} status={this.props.status} updateUserStatus={this.props.updateUserStatus} isOwner = {!this.props.match.params.userId} savePhoto = {this.props.savePhoto}/>
    )
  }

}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizeUserId: state.auth.id,
  isAuth: state.auth.isAuth,
  posts: state.profilePage.posts
});

export default compose(
  connect(mapStateToProps, { getProfileTC, getUserStatus, updateUserStatus, savePhoto }),
  withRouter
)(ProfileContainer)
