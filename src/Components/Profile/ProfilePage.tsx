import React, {useEffect} from 'react';
import {ProfileType} from '../../types/types';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {useDispatch, useSelector} from 'react-redux';
import {getProfile, getStatus} from '../../redux/profile/profile-selectors';
import {getUserProfile, updateUserStatus} from '../../redux/profile/profile-thunks';
import PostPage from '../Posts/PostPage';
import {getAuthId} from '../../redux/auth/auth-selectors';
import {useParams} from 'react-router-dom';
import {UploadFile} from 'antd/es/upload/interface';
import {Divider} from 'antd';

const ProfilePage: React.FC = React.memo(() => {

    const authorizeUserId = useSelector(getAuthId);
    const params = useParams();

    let userId: string = params.id || '';

    useEffect(() => {
        if(userId) {
            dispatch(getUserProfile({userId}));
        } else {
            dispatch(getUserProfile({userId: authorizeUserId}));
        }
    }, [userId]);


    const profile = useSelector(getProfile);
    const status = useSelector(getStatus);
    const isOwner = userId === authorizeUserId || !userId;
    const dispatch = useDispatch();

    const updateStatus = (status: string) => {
        dispatch(updateUserStatus({status}));
    };

    const savePhoto = (photos: UploadFile) => {
        // dispatch(saveProfilePhoto(photos))
    };

    const saveProfile = (data: ProfileType) => {
        // dispatch(saveUserProfile(data))
    };


    return (
        <div>
            <ProfileInfo profile={profile}
                         updateUserStatus={updateStatus}
                         isOwner={isOwner}
                         savePhoto={savePhoto}
                         saveProfile={saveProfile}/>
            {isOwner ? <Divider/> : null}
            {/*{isOwner ? <PostPage/> : null}*/}
        </div>
    );
});

export default ProfilePage;
