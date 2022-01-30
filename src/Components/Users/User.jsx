import React from 'react';
import {NavLink} from "react-router-dom";
import StyleSheet from "./User.module.css";

const User = ({user, followingInProgress, unfollow, follow}) => {
	return (

		<div>
                <span>
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
	                        ? <button disabled={followingInProgress
		                        .some(id => id === user.id)}
	                                  onClick={() => {
		                                  unfollow(user.id)
	                                  }}>
		                        Unfollow</button>
	                        : <button disabled={followingInProgress
		                        .some(id => id === user.id)}
	                                  onClick={() => {
		                                  follow(user.id)
	                                  }}>
		                        Follow</button>}

                    </div>
                </span>
			<span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                </span>
		</div>)
};

export default User; 
