import React, { useState } from 'react';

import {
  BookmarkSimpleIcon,
  ChatTextIcon,
  EyeIcon,
  ShareNetworkIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from '@phosphor-icons/react';

import { ActionIcon, Group, Indicator } from '@mantine/core';

import { useAppDispatch } from 'shared/hook';
import { markPostFavorite, togglePostRating } from 'shared/model';
import { IPost } from 'shared/types';

export type ICardActions = {
  post: IPost;
};

export const CustomCardActions: React.FC<ICardActions> = ({ post }) => {
  const [isFavorite, setIsFavorite] = useState(!!post.likes);
  const [rating, setRating] = useState(post.rating || 0);
  const [userRating, setUserRating] = useState(post.userRating || 0);

  const dispatch = useAppDispatch();

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite);
    dispatch(markPostFavorite({ postId: post._id }));
  };

  const onClickRating = (val: number) => {
    setRating(+rating + val);
    setUserRating(userRating + val);
    dispatch(togglePostRating({ postId: post._id, rating: userRating + val }));
  };

  return (
    <Group justify='space-between'>
      <ActionIcon.Group>
        <ActionIcon
          onClick={() => (userRating === -1 ? null : onClickRating(-1))}
          variant='subtle'
          aria-label='Decrement value'
        >
          <ThumbsDownIcon
            size={20}
            color='var(--mantine-color-red-text)'
            weight={userRating === -1 ? 'fill' : 'light'}
          />
        </ActionIcon>

        <ActionIcon.GroupSection
          variant='subtle'
          bg='var(--mantine-color-body)'
          miw={60}
          color={rating > 0 ? 'var(--mantine-color-teal-text)' : 'var(--mantine-color-red-text)'}
        >
          {rating.toString()}
        </ActionIcon.GroupSection>

        <ActionIcon
          onClick={() => (userRating === 1 ? null : onClickRating(1))}
          variant='subtle'
          aria-label='Increment value'
        >
          <ThumbsUpIcon
            size={20}
            color='var(--mantine-color-teal-text)'
            weight={userRating === 1 ? 'fill' : 'light'}
          />
        </ActionIcon>
      </ActionIcon.Group>

      <Group>
        <Indicator inline label={post.viewsCount} size={16} color='var(--mantine-color-cyan-6)'>
          <ActionIcon variant='subtle' color='gray' aria-label='View'>
            <EyeIcon size={20} color='var(--mantine-color-cyan-6)' />
          </ActionIcon>
        </Indicator>

        <Indicator
          inline
          label={post.comments.length}
          size={16}
          color='var(--mantine-color-violet-6)'
        >
          <ActionIcon variant='subtle' color='gray' aria-label='Comments'>
            <ChatTextIcon size={20} color='var(--mantine-color-violet-6)' />
          </ActionIcon>
        </Indicator>

        <ActionIcon variant='subtle' color='gray' aria-label='Share'>
          <ShareNetworkIcon size={20} color='var(--mantine-color-blue-6)' />
        </ActionIcon>

        <ActionIcon onClick={onClickFavorite} variant='subtle' color='gray' aria-label='Bookmark'>
          <BookmarkSimpleIcon
            size={20}
            color='var(--mantine-color-yellow-7)'
            weight={isFavorite ? 'fill' : 'light'}
          />
        </ActionIcon>
      </Group>
    </Group>
  );
};
