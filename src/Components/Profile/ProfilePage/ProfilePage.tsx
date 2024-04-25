import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProfile} from '../../../redux/profile/profile-selectors';
import {getUserProfile, getUserProfileStats} from '../../../redux/profile/profile-thunks';
import {useParams} from 'react-router-dom';
import {compose} from 'redux';
import withAuthRedirect from '../../HOC/withAuthRedirect';
import {getAuthId} from '../../../redux/auth/auth-selectors';
import PageLayout from '../../Common/PageLayout';
import ProfileMain from './ProfileMain';

const ProfilePage: React.FC = React.memo(() => {

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
        <PageLayout isMainPage mainChildren={<ProfileMain isOwner={isOwner} profile={profile}/>}/>
    );
});

export default compose<React.ComponentType>(withAuthRedirect)(ProfilePage);
