import React from 'react';
import Paginator from './../Paginator/Paginator';
import User from './User';
import StyleSheet from './AllUsers.module.css';

let AllUsers = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    // debugger
    return (
        <div> {
            <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                totalItemsCount={props.totalUsersCount} pageSize={props.pageSize} />
        }

            <div className={StyleSheet.cards}>
                {
                    props.users.map(u => <User user={u} followingInProgress={props.followingInProgress} key={u.id} unfollow={props.unfollowUserTC} follow={props.followUserTC} />)
                }
            </div>
        </div>
    )
}

export default AllUsers;