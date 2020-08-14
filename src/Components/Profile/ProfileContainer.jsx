import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getProfileTC, getUserStatus, updateUserStatus } from './../../redux/profile-reducer';
import withAuthRedirect from './../HOC/WithAuthRedirect';
import Profile from './Profile';


class ProfileContainer extends React.Component {


  constructor(props) { super(props); }

  componentDidMount() {

    let userId = this.props.match.params.userId;
    // if (!userId && this.props.isAuth) {
    //   userId = this.props.authorizeUserId;
    // }
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

  render() {
    return (
      <Profile posts={this.props.posts} profile={this.props.profile} status={this.props.status} updateUserStatus={this.props.updateUserStatus} />
    )
  }

};

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizeUserId: state.auth.id,
  isAuth: state.auth.isAuth,
  posts: state.profilePage.posts
});

export default compose(
  connect(mapStateToProps, { getProfileTC, getUserStatus, updateUserStatus }),
  withRouter
  // withAuthRedirect
)(ProfileContainer)