import React from 'react';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export function ArticlePageSkeleton() {
  return (
    <div>
      <Stack direction='column' alignItems='center'>
        <Skeleton variant='text' width='100%' height={100} />
        <Skeleton variant='text' width='100%' height={50} />
        <Skeleton variant='text' width='100%' height={300} />
      </Stack>

      <Skeleton width='100%' height={180} />
      <Skeleton width='100%' height={180} />
      <Skeleton width='100%' height={180} />
    </div>
  );
}
