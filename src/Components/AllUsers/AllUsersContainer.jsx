import {connect} from 'react-redux';
import {followUserTC, getUsersThunkCreator, setCurrentPage, toggleIsFollowingProgress, unfollowUserTC} from '../../redux/users-reducer';
import AllUsers from './AllUsers';
import React from 'react';
import Preloader from './../Common/Preloader/Preloader';
import {compose} from 'redux';
import {getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUserId, getUsers} from '../../redux/users-selectors';

class Users extends React.Component {

	componentDidMount() {
		this.props.getUsersThunkCreator(this.props.pageSize, this.props.currentPage);
	}

	onPageChanged = (pageNumber) => {
		this.props.setCurrentPage(pageNumber);
		this.props.getUsersThunkCreator(this.props.pageSize, pageNumber);
	};

	render() {
		return <>

			{this.props.isFetching ? <Preloader/> : null}
			<AllUsers
				totalUsersCount={this.props.totalUsersCount}
				pageSize={this.props.pageSize}
				currentPage={this.props.currentPage}
				onPageChanged={this.onPageChanged}
				users={this.props.users}
				followingInProgress={this.props.followingInProgress}
				followUserTC={this.props.followUserTC}
				unfollowUserTC={this.props.unfollowUserTC}
			/>
		</>
	}
}


let mapStateToProps = (state) => {
	return {
		users: getUsers(state),
		followingInProgress: getFollowingInProgress(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		userId: getUserId(state)
	}
};

export default compose(
	connect(mapStateToProps, {setCurrentPage, toggleIsFollowingProgress, getUsersThunkCreator, followUserTC, unfollowUserTC})
)(Users);
