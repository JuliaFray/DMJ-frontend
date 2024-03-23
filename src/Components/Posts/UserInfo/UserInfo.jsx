import React from 'react';
import styles from './UserInfo.module.scss';
import Avatar from '@mui/material/Avatar';
import moment from 'moment';
import {NO_AVATAR} from "../../../Utils/DictConstants";


export const UserInfo = ({avatar, fullName, additionalText}) => {
    const image = avatar && `data:image/jpeg;base64,${avatar}` || NO_AVATAR;
    return (
        <div className={styles.root}>
            <Avatar className={styles.avatar} src={image} alt={fullName}/>
            <div className={styles.userDetails}>
                <span className={styles.userName}>{fullName}</span>
                <span className={styles.additional}>{moment(additionalText).format('LL')}</span>
            </div>
        </div>
    );
};
