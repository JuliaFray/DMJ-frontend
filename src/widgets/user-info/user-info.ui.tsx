import React from 'react';
import Avatar from '@mui/material/Avatar';
import moment from 'moment';
import {Link} from 'react-router-dom';
import styles from './UserInfo.module.scss';
import 'moment/locale/ru';

export type IUserInfo = {
    avatar: string,
    fullName: string,
    additionalText: Date,
    userId: string
}

export const UserInfo: React.FC<IUserInfo> = ({avatar, fullName, additionalText, userId}) => {
    return (
        <div className={styles.root}>
            <Avatar className={styles.avatar} src={avatar} alt={fullName}/>
            <div className={styles.userDetails}>
                <Link to={`/user/${userId}`}><span className={styles.userName}>{fullName}</span></Link>
                <span className={styles.additional}>{moment(additionalText).locale('ru').fromNow()}</span>
            </div>
        </div>
    );
};
