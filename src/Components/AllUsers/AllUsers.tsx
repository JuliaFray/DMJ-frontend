import React from 'react';
import Paginator from '../Paginator/Paginator';
import User from './User';
import StyleSheet from './AllUsers.module.css';
import {UserType} from "../../types/types";

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (page: number) => void,
    partSize?: number,
    users: Array<UserType>,
    followingInProgress: Array<number>,
    unfollowUserTC: (userId: number) => Promise<void>,
    followUserTC: (userId: number) => Promise<void>
}

let AllUsers: React.FC<PropsType> = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for(let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div> {
            <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                       totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}/>
        }

            <div className={StyleSheet.cards}>
                {
                    props.users.map(u => <User user={u}
                                               key={u.id}
                                               followingInProgress={props.followingInProgress}
                                               unfollow={props.unfollowUserTC}
                                               follow={props.followUserTC}/>)
                }
            </div>
        </div>
    )
};

export default AllUsers;
