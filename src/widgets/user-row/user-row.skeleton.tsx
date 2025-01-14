import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const UserRowSkeleton: React.FC = () => {
    return (
        <Stack direction={'row'} spacing={1} height={200} sx={{alignItems: 'center'}}>
            <Skeleton variant='circular' width={80} height={80}/>
            <Skeleton variant='rounded' width={'80%'} height={100}/>
        </Stack>
    );
}
