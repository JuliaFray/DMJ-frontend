import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react';

import { Container, Tab, Tabs } from '@mui/material';

import { ProfileContext } from 'shared/context';
import { a11yProps } from 'shared/utils';

interface Props {
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
}

export const HomeTabs: React.FC<Props> = ({ tabIndex, setTabIndex }) => {
  const { isAuth } = useContext(ProfileContext);

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
