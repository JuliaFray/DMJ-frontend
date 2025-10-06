import React from 'react';

import moment from 'moment';
import 'moment/locale/ru';
import { Link } from 'react-router-dom';

import { Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import { pathKeys } from 'shared/lib';

import styles from './UserInfo.module.scss';

export type IUserInfo = {
  avatar: string;
  fullName: string;
  additionalText: Date;
  userId: string;
};

export const UserInfo: React.FC<IUserInfo> = ({ avatar, fullName, additionalText, userId }) => {
  return (
    <div className={styles.root}>
      <Avatar className={styles.avatar} src={avatar} alt={fullName} />
      <div className={styles.userDetails}>
        <Link to={pathKeys.users.byId({ id: userId })}>
          <span className={styles.userName}>{fullName}</span>
        </Link>
        <Tooltip
          className={styles.additional}
          title={moment(additionalText).locale('ru').format('DD.MM.YYYY HH:mm')}
        >
          <span className={styles.additional}>{moment(additionalText).locale('ru').fromNow()}</span>
        </Tooltip>
      </div>
    </div>
  );
};
