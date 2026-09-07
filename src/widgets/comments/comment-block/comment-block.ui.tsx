import React, { FC } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { Grid } from '@mantine/core';

import { Comment } from 'entities/comment';

import { IComment } from 'shared/types';

interface Props {
  items: IComment[];
  children?: React.ReactNode;
}

export const CommentsBlock: FC<Props> = ({ items, children }) => {
  return (
    <Grid mt='md'>
      <Grid.Col>{items?.map((obj: IComment) => <Comment key={uuidv4()} item={obj} />)}</Grid.Col>
      <Grid.Col>{children}</Grid.Col>
    </Grid>
  );
};
