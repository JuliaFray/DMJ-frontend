import React from 'react';
import ProfileInfo from '../Profile/ProfileInfo';
import {IProfile} from '../../../types/types';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

type IProfileMain = {
    isOwner: boolean,
    profile: IProfile | null
}

const ProfileMain: React.FC<IProfileMain> = (props, context) => {

    if(!props.profile) {
        return <Stack spacing={4} height={'100%'}>
            <Skeleton variant="rounded" width={'100%'} height={'25%'}/>
            <Skeleton variant="rounded" width={'100%'} height={'40%'}/>
        </Stack>
    }

    return (
        <ProfileInfo profile={props.profile} isOwner={props.isOwner}/>
    );
}

export default ProfileMain;
