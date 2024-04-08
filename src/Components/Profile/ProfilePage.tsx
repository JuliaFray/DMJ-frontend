import React, {useEffect} from 'react';
import ProfileInfo from './Profile/ProfileInfo';
import {useDispatch, useSelector} from 'react-redux';
import {getProfile} from '../../redux/profile/profile-selectors';
import {getUserProfile} from '../../redux/profile/profile-thunks';
import {useParams} from 'react-router-dom';
import {compose} from 'redux';
import withAuthRedirect from '../HOC/withAuthRedirect';
import {getAuthId} from '../../redux/auth/auth-selectors';

const ProfilePage: React.FC = React.memo(() => {

    const profile = useSelector(getProfile);
    const authorizeUserId = useSelector(getAuthId);

    const params = useParams();
    const dispatch = useDispatch();

    const isOwner = params.id === authorizeUserId;
    let userId: string = params.id || authorizeUserId || profile?.userId || '';

    useEffect(() => {
        dispatch(getUserProfile({userId}));
    }, [userId, dispatch]);

    return (
        <ProfileInfo profile={profile} isOwner={isOwner}/>
    );
});

export default compose<React.ComponentType>(withAuthRedirect)(ProfilePage);
