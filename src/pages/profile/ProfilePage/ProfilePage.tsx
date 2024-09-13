import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {compose} from 'redux';
import {getAuthId} from '~shared/model/auth/auth-selectors';
import {getProfile} from '~shared/model/profile/profile-selectors';
import {getUserProfile, getUserProfileStats} from '~shared/model/profile/profile-thunks';
import CommonLayoutUi from '~shared/ui/layouts/common-layout.ui';
import withAuthRedirect from '../../../Components/HOC/withAuthRedirect';
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
        <CommonLayoutUi isMainPage mainChildren={<ProfileMain isOwner={isOwner} profile={profile}/>}/>
    );
});

export default compose<React.ComponentType>(withAuthRedirect)(ProfilePage);
