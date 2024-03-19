import React from 'react';
import {NavLink} from "react-router-dom";
import StyleSheet from './Users.module.css'
import {IUser} from "../../types/types";
import {NO_AVATAR} from '../../Utils/DictConstants';

type UserPropsType = {
    user: IUser,
    followingInProgress: Array<string>,
    follow: (userId: string) => void,
    unfollow: (userId: string) => void
}

const User: React.FC<UserPropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return (

        <div className={StyleSheet.card}>
                <span className={StyleSheet.col}>
                    <div>
                        <NavLink to={'/users/' + user._id}>
                            <img alt='icon' src={user.avatarUrl || NO_AVATAR}
                                 className={StyleSheet.photo}
                            />
                        </NavLink>
                    </div>
                    <div>
                        {/*{user.followed*/}
                        {/*    ? <button className={StyleSheet.btn} disabled={followingInProgress*/}
                        {/*        .some(id => id === user._id)}*/}
                        {/*              onClick={() => {*/}
                        {/*                  unfollow(user._id)*/}
                        {/*              }}>*/}
                        {/*        Unfollow</button>*/}
                        {/*    : <button className={StyleSheet.btn} disabled={followingInProgress*/}
                        {/*        .some(id => id === user._id)}*/}
                        {/*              onClick={() => {*/}
                        {/*                  follow(user._id)*/}
                        {/*              }}>*/}
                        {/*        Follow</button>}*/}

                    </div>
                </span>
            <span className={StyleSheet.col}>
                    <span>
                        <div className={StyleSheet.name}>{user.firstName}</div>
                        {/*<div className={StyleSheet.status}>{user.status}</div>*/}
                    </span>
                </span>
        </div>

    )
};

export default User;
