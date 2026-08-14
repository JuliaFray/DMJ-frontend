import React from 'react';

import { HammerIcon } from '@phosphor-icons/react';

import { Alert } from '@mantine/core';

import { AvatarSelection } from 'widgets/settings/avatar-selection';

const show = true;

export const SettingsPage = () => {
  if (!show) {
    return (
      <Alert variant='light' color='blue' title='Ой' icon={<HammerIcon />}>
        Раздел находится в разработке
      </Alert>
    );
  }
  return <AvatarSelection />;
};
