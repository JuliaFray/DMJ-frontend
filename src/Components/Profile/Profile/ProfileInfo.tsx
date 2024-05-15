import React, {useCallback, useEffect, useState} from 'react';
import {IProfile} from '../../../types/types';
import {Grid} from '@mui/material';
import styles from './/ProfileInfo.module.scss';
import Divider from '@mui/material/Divider';
import {ProfileTabs} from './ProfileTabs';
import ProfileAvatar from './ProfileAvatar';
import ProfileData from './ProfileData';
import Loader from '../../Common/Loader';
import useWebSocket, {useAppDispatch} from '../../../hook/hooks';
import {saveUserProfile} from '../../../redux/profile/profile-thunks';
import {useSelector} from 'react-redux';
import {getIsFetching} from '../../../redux/profile/profile-selectors';
import {convertBase64ToBlob} from '../../../Utils/helper';
import {getUserOnline} from '../../../redux/app/app-selectors';
import {SocketEvents} from '../../../Utils/DictConstants';
import {appActions} from '../../../redux/app/app-slice';

type IProfileInfo = {
    profile: IProfile,
    isOwner: boolean
}

const ProfileInfo: React.FC<IProfileInfo> = React.memo(({profile, isOwner}) => {

    const [editMode, setEditMode] = useState(false);
    const [state, setState] = useState<IProfile>(profile);
    const [file, setFile] = useState<File | string | null>(null);
    const [status, setStatus] = useState(false);

    const isFetching = useSelector(getIsFetching);
    const users = useSelector(getUserOnline);

    const ws = useWebSocket();
    const dispatch = useAppDispatch();

    const handleWS = useCallback(
        (e: any) => {
            const {type, data} = JSON.parse(e.data);
            if(type === SocketEvents.LOGOUT_EVENT && !data.includes(profile._id)) {
                setStatus(false);
                dispatch(appActions.removeUserOnline({type: 'app/removeUserOnline', payload: profile._id}));
            }
        },
        [dispatch, profile._id]
    );

    useEffect(() => {
        if(!ws) return;

        ws.addEventListener("message", handleWS);
        return () => ws.removeEventListener("message", handleWS);
    }, [handleWS, ws]);

    const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

    const handleEdit = () => {
        setEditMode(prevState => !prevState);
        if(state && editMode) {
            const formData = new FormData();
            for(let key in state) {
                const val = getKeyValue<IProfile, keyof IProfile>(state, key);
                formData.append(key, typeof val === 'string' ? val : JSON.stringify(val));
            }

            if(file) {
                if(file instanceof File) {
                    formData.append('image', file);
                } else {
                    formData.append('image', convertBase64ToBlob(file));
                }
            }

            dispatch(saveUserProfile({profileId: state._id, file: formData}))
        }
    }

    const isOnline = status || users.includes(profile._id);

    return (
        <Grid className={styles.profileInfo} container>
            <Grid container columnSpacing={1} className={styles.profileCards}>
                <Grid item xs={8} className={isOnline ? `${styles.profile} ${styles.left} ${styles.on}` : `${styles.profile} ${styles.left} ${styles.off}`}>
                    {isFetching && <Loader/>}
                    {!isFetching && <ProfileData profile={state} isOwner={isOwner}
                                                 editMode={editMode} state={state} setState={setState}/>}
                </Grid>

                <Grid item xs={4} className={isOnline ? `${styles.profile} ${styles.right} ${styles.on}` : `${styles.profile} ${styles.right} ${styles.off}`}>
                    {isFetching && <Loader/>}
                    {!isFetching && <ProfileAvatar
                        profile={state} isOwner={isOwner} file={file} setFile={setFile}
                        editMode={editMode} setEditMode={handleEdit}/>}
                </Grid>


            </Grid>

            <Divider/>

            {!!profile && <ProfileTabs isOwner={isOwner} userId={profile._id}/>}

        </Grid>

    )
});

export default ProfileInfo;
