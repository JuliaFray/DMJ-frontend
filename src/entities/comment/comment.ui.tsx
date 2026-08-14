import React, { FC, useState } from 'react';

import { Paper, Typography } from '@mantine/core';

import { useAppDispatch } from 'shared/hook';
import { toggleCommentRating } from 'shared/model';
import { IComment } from 'shared/types';
import { UserButton } from 'shared/ui';

import styles from './comment.module.scss';

interface CommentProps {
  item: IComment;
}

export const Comment: FC<CommentProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const [rating, setRating] = useState(item?.rating || 0);
  const [userRating, setUserRating] = useState(item?.userRating || 0);

  if (!item || !item.userId) {
    return null;
  }

  const onClickRating = (val: number) => {
    setRating(rating + val);
    setUserRating(userRating + val);
    if (item._id) {
      dispatch(toggleCommentRating({ commentId: item._id, rating: userRating + val }));
    }
  };

  return (
    <Paper key={item._id} withBorder radius='md' className={styles.comment}>
      <UserButton user={item.userId} />
      <Typography className={styles.body}>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: item.text,
          }}
        />
      </Typography>
    </Paper>
  );
};
