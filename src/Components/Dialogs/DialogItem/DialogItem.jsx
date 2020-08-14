import React from 'react';
import StyleSheet from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

const DialogItem = (props) => {
    return (
        <div className={StyleSheet.dialogItem}>
            <div>
                <img src='https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png' />
            </div>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>

    )
}

export default DialogItem;