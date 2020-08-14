import React from 'react';
import Paginator from '../Paginator/Paginator';
import StyleSheet from './User.module.css';
import User from './User';

let AllUsers = (props) => {

    return (
        <div> {
            <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                totalItemsCount={props.totalUsersCount} pageSize={props.pageSize} />
        }

            <div className={StyleSheet.cards}>
                <div className={StyleSheet.cards}>

                    {
                        props.users.map(u => <User user={u} followingInProgress={props.followingInProgress} key={u.id} unfollow={props.unfollowUserTC} follow={props.followUserTC} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default AllUsers;