import React from 'react';

import { HammerIcon } from '@phosphor-icons/react';

import { Alert, Container } from '@mantine/core';

import { SettingsAccordion } from 'widgets/settings';

import classes from './settings.module.scss';

const show = true;

export const SettingsPage = () => {
  if (!show) {
    return (
      <Alert variant='light' color='blue' title='Ой' icon={<HammerIcon />}>
        Раздел находится в разработке
      </Alert>
    );
  }

  return (
    <Container size='sm' className={classes.wrapper}>
      <SettingsAccordion />
    </Container>
  );
};
