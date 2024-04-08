import React, {useState} from 'react';
import {IProfile} from '../../../types/types';
import {CircularProgress, Divider, Grid} from '@mui/material';
import styles from './/ProfileInfo.module.scss';
import {ProfileTabs} from './ProfileTabs';
import ProfileAvatar from './ProfileAvatar';
import ProfileData from './ProfileData';

type IProfileInfo = {
    profile: IProfile | null,
    isOwner: boolean
}

const ProfileInfo: React.FC<IProfileInfo> = React.memo(({profile, isOwner}) => {

    const [editMode, setEditMode] = useState(false);

    return (
        <Grid className={styles.profile} container
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch">
            <Grid container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="stretch" columnSpacing={2} className={styles.mainBlock}>
                <Grid item xs={3} className={styles.profileMain}>
                    {!profile && <CircularProgress/>}

                    {!!profile && <ProfileAvatar profile={profile} isOwner={isOwner}
                                                 editMode={editMode} setEditMode={setEditMode}/>}
                </Grid>

                <Grid item xs={8} className={styles.profileInfo}>
                    {!profile && <CircularProgress/>}
                    {!!profile && <ProfileData profile={profile} isOwner={isOwner} editMode={editMode}/>}
                </Grid>

            </Grid>

            <Divider/>

            {!!profile && <ProfileTabs isOwner={isOwner} userId={profile._id}/>}

        </Grid>

    )
});

export default ProfileInfo;
