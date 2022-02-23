import {connect} from 'react-redux';
import {followUser, requestUsers, unfollowUser} from '../../redux/users-reducer';
import AllUsers from './AllUsers';
import React, {ComponentType} from 'react';
import Preloader from '../Common/Preloader/Preloader';
import {compose} from 'redux';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersSearchTerm
} from '../../redux/users-selectors';
import {FilterType, UserType} from '../../types/types';
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    isFetching: boolean,
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    users: Array<UserType>,
    followingInProgress: Array<number>,
    filter: FilterType
}

type MapDispatchPropsType = {
    requestUsers: (pageSize: number, currentPage: number, filter: FilterType) => void,
    followUserTC: (userId: number) => void,
    unfollowUserTC: (userId: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class Users extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize, filter} = this.props;
        this.props.requestUsers(pageSize, currentPage, filter);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize, filter} = this.props;
        this.props.requestUsers(pageSize, pageNumber, filter);
    };

    onFilterChanged = (filter: FilterType) => {
        const {pageSize} = this.props;
        this.props.requestUsers(pageSize, 1, filter);
    };

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <AllUsers
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                term={this.props.filter.term}
                onPageChanged={this.onPageChanged}
                onFilterChanged={this.onFilterChanged}
                users={this.props.users}
                followingInProgress={this.props.followingInProgress}
                followUserTC={this.props.followUserTC}
                unfollowUserTC={this.props.unfollowUserTC}
                isFetching={this.props.isFetching}
            />
        </>
    }
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersSearchTerm(state)
    }
};

export default compose<ComponentType>(
    connect<MapStatePropsType, {}, MapDispatchPropsType, AppStateType>(
        mapStateToProps,
        {
            requestUsers: requestUsers,
            followUserTC: followUser,
            unfollowUserTC: unfollowUser
        }
    )
)(Users);
