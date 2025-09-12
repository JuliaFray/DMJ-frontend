import React, { CSSProperties } from 'react';

import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';

import { Avatar } from '@mui/material';

import { getFullName, getImage } from 'shared/lib';
import { TProfile } from 'shared/types';

import styles from './message.module.scss';

type TMessage = {
  text: string;
  withPrev: boolean;
  withNext: boolean;
  user: TProfile;
  sx: CSSProperties;
};
export const SimpleMessage: React.FC<TMessage> = ({ text, user, withPrev, withNext, sx }) => {
  return (
    <div className={styles.message} dir={sx.direction}>
      <div className={styles.messageOuter}>
        <div className={styles.messageInner}>
          <div
            style={sx}
            className={clsx(
              styles.messageBubble,
              { [styles.messageMiddle]: withPrev && withNext },
              { [styles.messageFirst]: !withPrev && withNext },
              { [styles.messageLast]: withPrev && !withNext },
            )}
          >
            {text}
          </div>
          <div className={styles.messageActions}>
            <ul className='menu' />
          </div>
          <div className={styles.messageSpacer} />
        </div>
        <div className={styles.messageAvatar}>
          <Avatar key={uuidv4()} alt={getFullName(user)} src={getImage(user.avatar, true)} />
        </div>
        <div className={styles.messageStatus} />
      </div>
    </div>
  );
};
