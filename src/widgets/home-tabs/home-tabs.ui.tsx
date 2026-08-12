import React, { Dispatch, SetStateAction, useEffect } from 'react';

import { Tabs } from '@mantine/core';

import { Nullable } from 'shared/types';
import { a11yProps } from 'shared/utils';

interface Props {
  tabIndex: string;
  setTabIndex: Dispatch<SetStateAction<string>>;
}

export const HomeTabs: React.FC<Props> = ({ tabIndex, setTabIndex }) => {
  useEffect(() => {
    setTabIndex('all');
  }, [setTabIndex]);

  const handleTabChange = (newValue: Nullable<string>) => {
    if (newValue) {
      setTabIndex(newValue);
    }
  };

  return (
    <Tabs value={tabIndex} onChange={handleTabChange}>
      <Tabs.List grow>
        <Tabs.Tab {...a11yProps('all')}>Все</Tabs.Tab>
        <Tabs.Tab {...a11yProps('best')}>Лучшие</Tabs.Tab>
        <Tabs.Tab {...a11yProps('mine')}>Мои подписки</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};
