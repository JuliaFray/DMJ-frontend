import React from 'react';

import { HammerIcon } from '@phosphor-icons/react';

import { Alert } from '@mantine/core';

export const MeasurePage = () => {
  return (
    <Alert variant='light' color='blue' title='Ой' icon={<HammerIcon />}>
      Раздел находится в разработке
    </Alert>
  );
};
