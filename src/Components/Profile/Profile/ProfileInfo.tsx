import React, {useState} from 'react';
import {IProfile} from '../../../types/types';
import {Grid} from '@mui/material';
import styles from './/ProfileInfo.module.scss';
import Divider from '@mui/material/Divider';
import {ProfileTabs} from './ProfileTabs';
import ProfileAvatar from './ProfileAvatar';
import ProfileData from './ProfileData';
import Loader from '../../Common/Loader';

type IProfileInfo = {
    profile: IProfile | null,
    isOwner: boolean
}

const ProfileInfo: React.FC<IProfileInfo> = React.memo(({profile, isOwner}) => {

    const [editMode, setEditMode] = useState(false);

    const handleEdit = () => {
        setEditMode(!editMode);
    }

    return (
        <Grid className={styles.profileRight} container>
            <Grid container columnSpacing={2} className={styles.profileCards}>
                <Grid item xs={3} className={styles.profileLeft}>
                    {!profile && <Loader/>}
                    {!!profile && <ProfileAvatar
                        profile={profile} isOwner={isOwner}
                        editMode={editMode} setEditMode={handleEdit}/>}
                </Grid>

                <Grid item xs={8} className={styles.profileRight}>
                    {!profile && <Loader/>}
                    {!!profile && <ProfileData profile={profile} isOwner={isOwner} editMode={editMode}/>}
                </Grid>

            </Grid>

            <Divider/>

            {!!profile && <ProfileTabs isOwner={isOwner} userId={profile._id}/>}

        </Grid>

    )
});

export default ProfileInfo;
