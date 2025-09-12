import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import { Avatar, SxProps, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';

import { useAppSelector } from 'shared/hook';
import { getFullName, getImage } from 'shared/lib';
import { getAuthId } from 'shared/model';
import { TMessage } from 'shared/types';

import styles from './message.module.scss';

export const Message: React.FC<TMessage> = ({ from, to, text }) => {
  const authId = useAppSelector(getAuthId);
  const user = from.userId === authId ? from : to;
  let sx: SxProps<Theme> = { my: 1 };
  sx =
    from._id === authId
      ? { ml: '55%', backgroundColor: `rgba(159, 237, 215, 0.2)`, ...sx }
      : { mr: '55%', backgroundColor: `rgba(2, 102, 112, 0.2)`, ...sx };

  return (
    <Stack direction='row' alignItems='start' columnGap={1}>
      <Typography sx={sx} className={styles.msgItem} key={uuidv4()} noWrap>
        {text}
      </Typography>
      <Avatar key={uuidv4()} alt={getFullName(user)} src={getImage(user.avatar, true)} />
    </Stack>
  );
};
