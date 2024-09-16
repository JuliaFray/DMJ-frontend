import React, {useEffect} from 'react';
import {Grid} from "@mui/material";
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getAuthId} from 'shared/model/auth/auth-selectors';
import {getProfile} from 'shared/model/profile/profile-selectors';
import {getUserProfile, getUserProfileStats} from 'shared/model/profile/profile-thunks';
import ProfileMain from './ProfilePage/ProfileMain';

export const ProfilePage: React.FC = React.memo(() => {

    const profile = useSelector(getProfile);
    const authorizeUserId = useSelector(getAuthId);

    const params = useParams();
    const dispatch = useDispatch();

    const isOwner = params.id === authorizeUserId;
    let userId: string = params.id || authorizeUserId || profile?.userId || '';

    useEffect(() => {
        dispatch(getUserProfile({userId}));
        dispatch(getUserProfileStats({userId}));
    }, [userId]);

    return (
        <Grid container spacing={2}>
            <Grid item md={9}>
                <ProfileMain isOwner={isOwner} profile={profile}/>
            </Grid>

            <Grid item md={3}></Grid>
        </Grid>
    );
});
