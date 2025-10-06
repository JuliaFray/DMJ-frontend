import React, { FC } from 'react';

import { v4 as uuidv4 } from 'uuid';

import List from '@mui/material/List';

import { Comment } from 'entities/comment';

import { TComment } from 'shared/types';

interface Props {
  items: TComment[];
  isLoading: boolean;
  children?: React.ReactNode;
}

export const CommentsBlock: FC<Props> = ({ items, isLoading = true, children }) => {
  return (
    <>
      <List sx={{ width: '100%' }}>
        {(isLoading ? [...Array(5)] : items)?.map((obj: TComment) => (
          <Comment key={uuidv4()} item={obj} isLoading={isLoading} />
        ))}
      </List>
      {children}
    </>
  );
};
