import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const PostSkeleton: React.FC = () => {
    return (
        <Stack spacing={1} height={'234px'}>
            <Stack spacing={1} direction={'row'} height={'20%'}>
                <Skeleton variant="circular" width={40} height={40}/>
                <Stack spacing={1} width={'90%'} height={'100%'} sx={{justifyContent: 'center'}}>
                    <Skeleton variant="rounded" width={'100%'} height={10}/>
                </Stack>
            </Stack>

            <Skeleton variant="rounded" width={'100%'} height={'60%'}/>

            <Skeleton variant="rounded" width={'100%'} height={'5%'}/>

        </Stack>
    );
}
