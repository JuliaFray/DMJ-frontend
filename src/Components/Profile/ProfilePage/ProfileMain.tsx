import React from 'react';
import ProfileInfo from '../Profile/ProfileInfo';
import {IProfile} from '../../../types/types';
import {CircularProgress} from '@mui/material';
import style from '../../Users/UsersPage/Users.module.scss';

type IProfileMain = {
    isOwner: boolean,
    profile: IProfile | null
}

const ProfileMain: React.FC<IProfileMain> = (props, context) => {
    if(!props.profile) {
        return <CircularProgress className={style.pending}/>
    }
    return (
        <ProfileInfo profile={props.profile} isOwner={props.isOwner}/>
    );
}

export default ProfileMain;
