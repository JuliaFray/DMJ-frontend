import React, {ChangeEvent, useState} from 'react';
import './ProfileInfo.module.css';
import Preloader from './../../Common/Preloader/Preloader';
import userPhoto from './../../../assets/avatar.jpg';
import ProfileDataForm from './ProfileDataForm';
import {ContactsType, ProfileType} from '../../../types/types';

type PropsType = {
    profile: ProfileType | null,
    isOwner: boolean,
    status: string,
    saveProfile: (profile: ProfileType) => void,
    savePhoto: (file: File) => void,
    updateUserStatus: (text: string) => void
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateUserStatus, isOwner, savePhoto, saveProfile}) => {
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }
    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData)
    };

    const mainPhotoSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    };

    return (
        <div className='s.descriptionBlock'>
            <img alt={'avatar'} src={profile.photos.large != null ? profile.photos.large : userPhoto}/>

            {isOwner && <input type={'file'} onChange={mainPhotoSelect}/>}

            {editMode
                ? <ProfileDataForm initialValues={profile} onSubmit={onSubmit} profile={profile}/>
                : <ProfileData profile={profile}
                               isOwner={isOwner}
                               goToEditMode={() => {
                                   setEditMode(true)
                               }}/>}


        </div>
    )
};

type ProfileDataPropsType = {
    profile: ProfileType,
    isOwner: boolean,
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = (props) => {
    return (
        <div>
            {props.isOwner && <div>
				<button onClick={props.goToEditMode}>Edit</button>
			</div>}
            <div>
                <b>Full name</b>: {props.profile.fullName}
            </div>
            <div>
                <b>Looking for a job:</b>{props.profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {props.profile.lookingForAJob &&
			<div>
				<b>My prof skills:</b>{props.profile.lookingForAJobDescription}
			</div>
            }
            <div>
                <b>About me:</b>{props.profile.aboutMe}
            </div>
            <div>
                <br/>
                <b>Contacts:</b> {Object.keys(props.profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key as keyof ContactsType]}/>
            })}
            </div>
        </div>
    )
};

type ContactsPropsType = {
    contactTitle: string,
    contactValue: string
}

const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return (
        <div>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    )
};

export default ProfileInfo;
