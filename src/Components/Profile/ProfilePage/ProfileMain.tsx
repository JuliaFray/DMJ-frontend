import React from 'react';
import ProfileInfo from '../Profile/ProfileInfo';
import {Grid} from '@mui/material';
import {IProfile} from '../../../types/types';

type IProfileMain = {
    isOwner: boolean,
    profile: IProfile | null
}

const ProfileMain: React.FC<IProfileMain> = (props, context) => {
    return (
        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}
              sx={{margin: 0}} style={{marginTop: '20px', marginBottom: '20px'}}>
            <ProfileInfo profile={props.profile} isOwner={props.isOwner}/>
        </Grid>
    );
}

export default ProfileMain;
