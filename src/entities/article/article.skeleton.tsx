import React, { FC } from 'react';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const RGBA = 'rgba(246, 246, 246, 0.7)';

export const ArticleSkeleton: FC = () => {
  return (
    <Stack spacing={2} height='316px'>
      <Stack spacing={1} direction='row' height='20%'>
        <Skeleton
          variant='circular'
          width={40}
          height={40}
          style={{ backgroundColor: RGBA, margin: '10px auto' }}
        />
        <Stack spacing={1} width='90%' height='100%' sx={{ justifyContent: 'center' }}>
          <Skeleton variant='rounded' width='30%' height={10} style={{ backgroundColor: RGBA }} />
          <Skeleton variant='rounded' width='20%' height={10} style={{ backgroundColor: RGBA }} />
        </Stack>
      </Stack>

      <Skeleton variant='rounded' width='100%' height='60%' style={{ backgroundColor: RGBA }} />
    </Stack>
  );
};
