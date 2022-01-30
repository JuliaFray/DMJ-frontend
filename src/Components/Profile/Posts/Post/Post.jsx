import React from 'react';
import StyleSheet from './Post.module.css';

function Post(props) {
	return (
		<div className={StyleSheet.post}>

			<img alt='userAvatar' src='https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png'/>

			<div className={StyleSheet.postItem}>
				{props.message}
			</div>

			<div className={StyleSheet.quality}>
				<span>Like {props.like}</span>
				<span>Dislike {props.dislike}</span>
			</div>

		</div>
	)
}

export default Post;
