/* eslint-disable no-restricted-imports */
import React, { useEffect, useState } from 'react';

import { Container, Tabs } from '@mantine/core';

import { HomePage } from 'pages/article-feed/article-feed-page.ui';
import { UsersPage } from 'pages/user-feed/user-feed-page.ui';

import { useAuth } from 'shared/context';
import { TProfileStats } from 'shared/types';
import { a11yProps } from 'shared/utils';

import { CommentsFeed } from '../comments/comments-feed';

export type IProfileTabs = {
  userId: string;
  stats?: TProfileStats;
};

export const ProfileTabs: React.FC<IProfileTabs> = ({ userId, stats }) => {
  const { authId } = useAuth();

  const isMe = authId === userId;

  const [activeTab, setActiveTab] = useState<string | null>('0');

  useEffect(() => {
    setActiveTab('0');
  }, []);

  return (
    <Container style={{ margin: 0, padding: 0 }}>
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List grow>
          <Tabs.Tab {...a11yProps('0')}>Подписки</Tabs.Tab>
          <Tabs.Tab {...a11yProps('1')}>{isMe ? 'Мои статьи' : 'Статьи'}</Tabs.Tab>
          <Tabs.Tab {...a11yProps('2')}>Комментарии</Tabs.Tab>
          {isMe && <Tabs.Tab {...a11yProps('3')}>Избранное</Tabs.Tab>}
        </Tabs.List>

        <Tabs.Panel value='0'>
          <UsersPage isFollowers />
        </Tabs.Panel>

        <Tabs.Panel value='1'>
          <HomePage showMyPosts isFeedPage={false} userId={userId} isFavorite={false} />
        </Tabs.Panel>

        <Tabs.Panel value='2'>
          <CommentsFeed userId={userId} />
        </Tabs.Panel>

        {isMe && (
          <Tabs.Panel value='3'>
            <HomePage showMyPosts isFeedPage={false} userId={userId} isFavorite />
          </Tabs.Panel>
        )}
      </Tabs>
    </Container>
  );
};
