import React, {useEffect} from 'react';
import {ProfileType} from '../../types/types';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {useDispatch, useSelector} from 'react-redux';
import {getProfile, getStatus} from '../../redux/profile-selectors';
import {getUserProfile, getUserStatus, saveProfilePhoto, saveUserProfile, updateUserStatus} from '../../redux/profile-reducer';
import Posts from './Posts/Posts';
import {getAuthId} from '../../redux/auth-selectors';
import {useHistory, useLocation, useParams} from 'react-router-dom';
import {UploadFile} from 'antd/es/upload/interface';
import {Divider} from 'antd';

const ProfilePage: React.FC = React.memo(() => {

    const authorizeUserId = useSelector(getAuthId);
    const params = useParams();

    // @ts-ignore
    let userId: string = params.id;

    useEffect(() => {
        if(userId) {
            dispatch(getUserProfile(userId));
            // dispatch(getUserStatus(userId));
        } else {
            dispatch(getUserProfile(authorizeUserId));
            // dispatch(getUserStatus(authorizeUserId));
        }
    }, [userId]);


    const profile = useSelector(getProfile);
    const status = useSelector(getStatus);
    const isOwner = userId === authorizeUserId || !userId;
    const dispatch = useDispatch();

    const updateStatus = (status: string) => {
        dispatch(updateUserStatus(status));
    };

    const savePhoto = (photos: UploadFile) => {
        dispatch(saveProfilePhoto(photos))
    };

    const saveProfile = (data: ProfileType) => {
        dispatch(saveUserProfile(data))
    };


    return (
        <div>
            <ProfileInfo profile={profile}
                         status={status}
                         updateUserStatus={updateStatus}
                         isOwner={isOwner}
                         savePhoto={savePhoto}
                         saveProfile={saveProfile}/>
            {isOwner ? <Divider/> : null}
            {isOwner ? <Posts/> : null}
        </div>
    );
});

export default ProfilePage;
