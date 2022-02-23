import React from 'react';
import {NavLink} from "react-router-dom";
import StyleSheet from './AllUsers.module.css'
import {UserType} from "../../types/types";

type PropsType = {
    user: UserType,
    followingInProgress: Array<number>,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void
}

const User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return (

        <div className={StyleSheet.card}>
                <span className={StyleSheet.col}>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img alt='icon' src={user.photos.small != null ? user.photos.small :
                                'https://w7.pngwing.com/pngs/549/17/png-transparent-social-media-avatar-social-network-computer-icons-communication-social-media-computer-network-black-internet.png'}
                                 className={StyleSheet.photo}
                            />
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button className={StyleSheet.btn} disabled={followingInProgress
                                .some(id => id === user.id)}
                                      onClick={() => {
                                          unfollow(user.id)
                                      }}>
                                Unfollow</button>
                            : <button className={StyleSheet.btn} disabled={followingInProgress
                                .some(id => id === user.id)}
                                      onClick={() => {
                                          follow(user.id)
                                      }}>
                                Follow</button>}

                    </div>
                </span>
            <span className={StyleSheet.col}>
                    <span>
                        <div className={StyleSheet.name}>{user.name}</div>
                        <div className={StyleSheet.status}>{user.status}</div>
                    </span>
                </span>
        </div>

    )
};

export default User;
