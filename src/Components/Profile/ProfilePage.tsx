import React, {useEffect} from 'react';
import {IProfile} from '../../types/types';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {useDispatch, useSelector} from 'react-redux';
import {getProfile} from '../../redux/profile/profile-selectors';
import {getUserProfile} from '../../redux/profile/profile-thunks';
import {getAuthId} from '../../redux/auth/auth-selectors';
import {useParams} from 'react-router-dom';
import {UploadFile} from 'antd/es/upload/interface';
import {compose} from 'redux';
import withAuthRedirect from '../HOC/withAuthRedirect';

const ProfilePage: React.FC = React.memo(() => {

    const authorizeUserId = useSelector(getAuthId);
    const params = useParams();
    const profile = useSelector(getProfile);

    let userId: string = params.id || authorizeUserId || profile?.userId || '';

    useEffect(() => {
        if(userId) {
            dispatch(getUserProfile({userId}));
        } else {
            dispatch(getUserProfile({userId: authorizeUserId}));
        }
    }, [userId]);

    const isOwner = userId === authorizeUserId || !userId;
    const dispatch = useDispatch();


    const savePhoto = (photos: UploadFile) => {
        // dispatch(saveProfilePhoto(photos))
    };

    const saveProfile = (data: IProfile) => {
        // dispatch(saveUserProfile(data))
    };


    return (
        <ProfileInfo profile={profile}
                     isOwner={isOwner}
                     savePhoto={savePhoto}
                     saveProfile={saveProfile}/>

    );
});

export default compose<React.ComponentType>(withAuthRedirect)(ProfilePage);
