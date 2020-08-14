import React from 'react';
import Paginator from '../Paginator/Paginator';
import StyleSheet from './AllUsers.module.css'

let Users = ([currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props]) => {
    return (
        <div >
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize} />
            <div>
                {
                    users.map(u => <User user={u}
                        followingInProgress={props.followingInProgress}
                        follow={this.props.follow}
                        unfollow={this.props.unfollow} />
                    )
                }
            </div>
        </div>
    )
}

export default Users;