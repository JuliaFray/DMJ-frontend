import React from 'react';

import { Grid } from '@mantine/core';

import { ArticleSkeleton } from 'entities/article';

export function UserPageSkeleton() {
  return (
    <Grid>
      {new Array(10).fill(0).map((__, index) => (
        <Grid.Col key={index}>
          <ArticleSkeleton />
        </Grid.Col>
      ))}
    </Grid>
  );
}
