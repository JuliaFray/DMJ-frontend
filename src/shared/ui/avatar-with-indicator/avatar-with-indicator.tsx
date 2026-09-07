import React, { CSSProperties, FC } from 'react';

import { Avatar, Indicator } from '@mantine/core';

import { useOnline } from '../../hook';
import { getAvatarSrc } from '../../utils';

interface Props {
  avatarId?: string;
  profileId: string;
  styles?: CSSProperties;
  size?: number;
}

export const AvatarWithIndicator: FC<Props> = ({ avatarId, profileId, styles, size = 94 }) => {
  const { isOnline } = useOnline(profileId);

  return (
    <Indicator
      color={isOnline ? 'green' : 'gray'}
      style={{ width: 'fit-content', margin: '0 auto' }}
    >
      <Avatar src={getAvatarSrc(avatarId)} size={size} radius='md' alt='avatar' style={styles} />
    </Indicator>
  );
};
