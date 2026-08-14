import React from 'react';

import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';

import { Avatar, Badge, Card, Group, Image, Text } from '@mantine/core';

import { getFullName, NO_AVATAR, pathKeys } from 'shared/lib';
import { IPost, TChipData } from 'shared/types';
import { getAvatarSrc } from 'shared/utils';

import classes from './ArticleCardFooter.module.css';
import { CustomCardActions } from './custom-card-actions.ui';

export type PostCardProps = {
  post: IPost;
  isOneArticlePage: boolean;
  allTags?: TChipData[];
  handleAddTag?: (item: TChipData, isAuthor?: boolean) => void;
};

export const ArticleCard: React.FC<PostCardProps> = ({
  post,
  isOneArticlePage,
  allTags,
  handleAddTag,
}) => {
  const navigate = useNavigate();

  const image = post.userId.avatar && `data:image/jpeg;base64,${post.userId.avatar?.data}`;

  return (
    <Card withBorder padding='lg' radius='md' className={classes.card}>
      {image && (
        <Card.Section mb='lg'>
          <Image src={image} alt={NO_AVATAR} height={180} />
        </Card.Section>
      )}

      {!isOneArticlePage && (
        <Group>
          {post.tags?.map((tag) => (
            <Badge
              key={tag._id}
              variant={allTags?.some((t) => t._id === tag._id) ? 'filled' : 'outline'}
              onClick={() => handleAddTag?.(tag)}
              style={{ cursor: 'pointer' }}
            >
              {tag.value}
            </Badge>
          ))}
        </Group>
      )}

      <Text
        style={{ cursor: 'pointer' }}
        className={classes.title}
        onClick={() => navigate(pathKeys.article.byId({ id: post._id }))}
      >
        {post.title}
      </Text>

      <Group
        className={classes.avatar}
        mt='lg'
        onClick={() => navigate(pathKeys.user.byId({ id: post.userId._id }))}
      >
        {!isOneArticlePage && (
          <Avatar src={getAvatarSrc(post.userId.avatarId)} radius='sm' alt={post.userId.login} />
        )}

        <div>
          <Text c='bright' fw={500}>
            {getFullName(post.userId)}
          </Text>
          <Text size='xs'>{moment(post.createdAt).locale('ru').fromNow()}</Text>
        </div>
      </Group>

      {!isOneArticlePage && (
        <Card.Section className={classes.footer}>
          <CustomCardActions post={post} />
        </Card.Section>
      )}
    </Card>
  );
};
