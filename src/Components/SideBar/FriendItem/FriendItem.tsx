import React from 'react';
import {Link} from 'react-router-dom';
import StyleSheet from './../SideBar.module.css';
import {SimpleNameObj} from "../../../types/types";

const FriendItem: React.FC<SimpleNameObj> = (props) => {
    return (
        <div className={StyleSheet.friendItem}>
            <img alt='icon' src='https://cdn3.iconfinder.com/data/icons/social-media-set-1-1/256/Social_Media-11-512.png'/>
            <Link to={'/friends/' + props.id}>{props.name}</Link>
        </div>
    )
};

export default FriendItem;
