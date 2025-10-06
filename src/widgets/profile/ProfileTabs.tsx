import React, { useEffect, useState } from 'react';

import { Article, Grade, People } from '@mui/icons-material';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Container, Tab, Tabs } from '@mui/material';

// eslint-disable-next-line no-restricted-imports
import { HomePage } from 'pages/article-feed/home-page.ui';
// eslint-disable-next-line no-restricted-imports
import { UsersPage } from 'pages/users/users-page.ui';

import { TabPanel } from 'shared/ui';
import { a11yProps } from 'shared/utils';

import { CommentsFeed } from '../comments/comments-feed';

export type IProfileTabs = {
  isOwner: boolean;
  userId: string;
};

export const ProfileTabs: React.FC<IProfileTabs> = ({ isOwner, userId }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  useEffect(() => {
    setTabIndex(0);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Container style={{ margin: 0, padding: 0 }} maxWidth='lg'>
      <Tabs value={tabIndex} onChange={handleTabChange} centered variant='fullWidth'>
        <Tab
          iconPosition='start'
          icon={<People color='disabled' />}
          label='Подписки'
          {...a11yProps(0)}
        />
        <Tab
          iconPosition='start'
          icon={<Article color='disabled' />}
          label={isOwner ? 'Мои статьи' : 'Статьи'}
          {...a11yProps(1)}
        />
        <Tab
          iconPosition='start'
          icon={<CommentIcon color='disabled' />}
          label='Комментарии'
          {...a11yProps(2)}
        />
        {isOwner && (
          <Tab
            iconPosition='start'
            icon={<Grade color='disabled' />}
            label='Избранное'
            {...a11yProps(3)}
          />
        )}
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <UsersPage isMainPage={false} isFollowers />
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <HomePage isOwner isMainPage={false} userId={userId} isFavorite={false} isLoad />
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        <CommentsFeed userId={userId} />
      </TabPanel>

      {isOwner && (
        <TabPanel value={tabIndex} index={3}>
          <HomePage isOwner={isOwner} isMainPage={false} userId={userId} isFavorite isLoad />
        </TabPanel>
      )}
    </Container>
  );
};
