import React from 'react';
import styles from './UserInfo.module.scss';
import Avatar from '@mui/material/Avatar';
import moment from 'moment';


export const UserInfo = ({avatarUrl, fullName, additionalText}) => {
    return (
        <div className={styles.root}>
            <Avatar className={styles.avatar} src={avatarUrl || '/broken-image.jpg'} alt={fullName}/>
            <div className={styles.userDetails}>
                <span className={styles.userName}>{fullName}</span>
                <span className={styles.additional}>{moment(additionalText).format('LL')}</span>
            </div>
        </div>
    );
};
