import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { followUserTC, getUsersThunkCreator, setCurrentPage, toggleIsFollowingProgress, unfollowUserTC } from './../../redux/users-reducer';
import { getPageSize, getUsers } from './../../redux/users-selectors';
import Preloader from './../Common/Preloader/Preloader';
import Users from './Users';

class UsersContainer extends React.Component {

    componentDidMount() {
        const {pageSize, currentPage} = this.props;
        this.props.getUsersThunkCreator(pageSize, currentPage);
    }

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.getUsersThunkCreator(pageSize, pageNumber);
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader /> : null}
            
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                followingInProgress={this.props.toggleIsFollowingProgress}
                followUserTC={this.props.followUserTC}
                unfollowUserTC={this.props.unfollowUserTC}
            />
        </>
    }
}



let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        // followingInProgress: getFollowingInProgress(state),
        pageSize: getPageSize(state),
        // totalUsersCount: getTotalUsersCount(state),
        // currentPage: getCurrentPage(state),
        // isFetching: getIsFetching(state),
        // userId: getUserId(state)
    }
};

export default compose(
    connect(mapStateToProps, { setCurrentPage, toggleIsFollowingProgress, getUsersThunkCreator, followUserTC, unfollowUserTC })
)(UsersContainer);