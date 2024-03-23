import React, {ChangeEvent} from 'react';
import StyleSheet from './Description.module.css';
import ProfileStatusWithHooks from '../ProfileInfo/ProfileStatusWithHooks';
import {IProfile} from '../../../types/types';
import {NO_AVATAR} from '../../../Utils/DictConstants';
import {CircularProgress} from '@mui/material';

type PropsType = {
    profile: IProfile | null,
    isOwner: boolean,
    status: string,

    savePhoto: (data: FormData) => void,
    updateUserStatus: (status: string) => void
}

const Avatar: React.FC<PropsType> = (props) => {
    if(!props.profile) {
        return <CircularProgress/>
    }
    let contacts = Object.entries(props.profile.contacts);

    let contactForm = contacts.map(c => c[1] && <a className={StyleSheet.contact} href={'https://' + c[1]}> {c[0]} </a>);

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        let formData = new FormData();
        if(e.target && e.target.files) {
            formData.append('image', e.target.files[0]);
            if(e.target?.files?.length) {
                props.savePhoto(formData);
            }
        }
    };


    return (
        <div className={StyleSheet.avatar}>
            <div className={StyleSheet.avatarImg}>
                <img alt='icon' src={props.profile.avatarId || NO_AVATAR}/>

                <div>
                    {props.isOwner && <div>
                        <input type={'file'} className={StyleSheet.btn} onChange={onMainPhotoSelected} name={'file'} id={'file'}/>
                        <label form='file'>Choose a file</label>
                    </div>}
                </div>

            </div>


            <div className={StyleSheet.description}>
                <div className={StyleSheet.item}>
                    <div className={StyleSheet.name}>Name:</div>
                    <div className={StyleSheet.key}>{props.profile.firstName}</div>
                </div>

                <div className={StyleSheet.item}>
                    <div className={StyleSheet.name}>Status:</div>
                    <div className={StyleSheet.key}>

                        <ProfileStatusWithHooks isOwner={props.isOwner} status={props.status} updateUserStatus={props.updateUserStatus}/>
                    </div>

                </div>


                <div className={StyleSheet.item}>
                    <div className={StyleSheet.name}>Contacts:</div>
                    <div className={StyleSheet.key}>{contactForm}</div>

                </div>

                {/*<div className={StyleSheet.item}>*/}
                {/*    <div className={StyleSheet.name}>LookingForAJob:</div>*/}
                {/*    <div className={StyleSheet.key}>{props.profile.lookingForAJobDescription}</div>*/}
                {/*</div>*/}
            </div>
        </div>
    )
};

export default Avatar;
