import React from 'react';
import styles from './UserInfo.module.scss';
import Avatar from '@mui/material/Avatar';
import moment from 'moment';

export type IUserInfo = {
    avatar: string,
    fullName: string,
    additionalText: Date
}

export const UserInfo: React.FC<IUserInfo> = ({avatar, fullName, additionalText}) => {
    return (
        <div className={styles.root}>
            <Avatar className={styles.avatar} src={avatar} alt={fullName}/>
            <div className={styles.userDetails}>
                <span className={styles.userName}>{fullName}</span>
                <span className={styles.additional}>{moment(additionalText).format('LL')}</span>
            </div>
        </div>
    );
};
