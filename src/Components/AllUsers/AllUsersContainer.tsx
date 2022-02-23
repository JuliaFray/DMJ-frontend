import {connect} from 'react-redux';
import {followUser, requestUsers, unfollowUser} from '../../redux/users-reducer';
import AllUsers from './AllUsers';
import React, {ComponentType} from 'react';
import Preloader from '../Common/Preloader/Preloader';
import {compose} from 'redux';
import {getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers} from '../../redux/users-selectors';
import {UserType} from '../../types/types';
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    isFetching: boolean,
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    users: Array<UserType>,
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    requestUsers: (pageSize: number, currentPage: number) => void,
    followUserTC: (userId: number) => Promise<void>,
    unfollowUserTC: (userId: number) => Promise<void>
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class Users extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props;
        this.props.requestUsers(pageSize, pageNumber);
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


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
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
