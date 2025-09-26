import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { Container, Tab, Tabs } from '@mui/material';
import Paper from '@mui/material/Paper';

import { getIsAuth } from 'shared/model';

import styles from './home-tabs.module.scss';

const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

interface Props {
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
}
export const HomeTabs: React.FC<Props> = ({ tabIndex, setTabIndex }) => {
  const isAuth = useSelector(getIsAuth);

  useEffect(() => {
    setTabIndex(0);
  }, [setTabIndex]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Container maxWidth='lg'>
      <>
        {isAuth && (
          <Tabs value={tabIndex} onChange={handleTabChange} centered variant='fullWidth'>
            <Tab label='Мои подписки' {...a11yProps(0)} />
            <Tab label='Все' {...a11yProps(1)} />
            <Tab label='Лучшие' {...a11yProps(2)} />
          </Tabs>
        )}
        {!isAuth && (
          <Tabs value={tabIndex} onChange={handleTabChange} centered variant='fullWidth'>
            <Tab label='Все' {...a11yProps(0)} />
            <Tab label='Лучшие' {...a11yProps(1)} />
          </Tabs>
        )}
      </>
    </Container>
  );
};
