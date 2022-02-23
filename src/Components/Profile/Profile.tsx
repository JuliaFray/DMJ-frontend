import React from 'react';
import PostsContainer from './Posts/PostsContainer';
import {ProfileType} from '../../types/types';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type PropsType = {
    isOwner: boolean,
    profile: ProfileType | null,
    status: string,
    authorizeUserId: number | null,
    isAuth: boolean,
    getProfileTC: (id: number) => void,
    getUserStatus: (id: number) => void,
    updateUserStatus: (status: string) => void,
    savePhoto: (data: File) => void,
    saveProfile: (data: ProfileType) => void
}

const Profile: React.FC<PropsType> = (props) => {

    return (
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateUserStatus={props.updateUserStatus}
                         isOwner={props.isOwner}
                         savePhoto={props.savePhoto}
                         saveProfile={props.saveProfile}/>
            <PostsContainer/>
        </div>
    );
};

export default Profile;
