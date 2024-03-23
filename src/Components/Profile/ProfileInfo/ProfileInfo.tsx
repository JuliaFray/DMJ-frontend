import React, {ChangeEvent, useRef, useState} from 'react';
import {IProfile} from '../../../types/types';
import {NO_AVATAR} from '../../../Utils/DictConstants';
import {CircularProgress, Container, Divider} from '@mui/material';
import styles from '../ProfileInfo/ProfileInfo.module.scss';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import {ProfileTabs} from './ProfileTabs';
import {useDispatch, useSelector} from 'react-redux';
import {saveProfilePhoto} from '../../../redux/profile/profile-thunks';
import {getProfileAvatar} from '../../../redux/profile/profile-selectors';

type PropsType = {
    profile: IProfile | null,
    isOwner: boolean
}

const ProfileInfo: React.FC<PropsType> = ({profile, isOwner}) => {

    const [onHover, setOnHover] = useState(false);

    const avatar = useSelector(getProfileAvatar);

    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();

    if(!profile) {
        return <CircularProgress/>
    }

    const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = (event.target as HTMLInputElement).files;
        if(profile && files) {
            try {
                setOnHover(false);
                const formData = new FormData();
                formData.append('image', files[0]);
                dispatch(saveProfilePhoto({profileId: profile._id, file: formData}))
            } catch(err) {
                console.warn(err);
                alert('Ошибка при загрузке файла');
            }
        }
    };

    const url = avatar && `data:${avatar.contentType};base64,${avatar.data}` || NO_AVATAR;

    return (<>
            <Container className={styles.mainBlock}>

                {onHover && <IconButton aria-label="delete" size="large" className={styles.avatar}
                                        onClick={() => inputRef.current?.click()}>
                    <AddIcon className={styles.avatar}
                             onMouseOut={() => setOnHover(false)}>
                    </AddIcon>
                </IconButton>}
                <input ref={inputRef} type='file' onChange={handleChangeFile} hidden/>

                {!onHover && <Avatar onMouseOver={() => setOnHover(true)}
                                     className={styles.avatar}
                                     src={url}
                                     alt={profile.firstName}/>}

                <ProfileData profile={profile}
                             isOwner={isOwner}/>
            </Container>

            <Divider/>

            <ProfileTabs/>

        </>

    )
};

type ProfileDataPropsType = {
    profile: IProfile,
    isOwner: boolean
}

const ProfileData: React.FC<ProfileDataPropsType> = (props) => {
    return (
        <div className={styles.profileData}>
            <div>
                {`${props.profile.firstName} ${props.profile.secondName} ${props.profile.lastName ? props.profile.lastName : ''}`}
            </div>

            {/*<div>*/}
            {/*    Контакты*/}
            {/*    {props?.profile?.contacts && Object.keys(props?.profile?.contacts).map(key => {*/}
            {/*        return <div key={key}>{props?.profile?.contacts[key as keyof IContact]}*/}

            {/*            {key}</div>*/}
            {/*    })}*/}
            {/*</div>*/}

            {/*{props.isOwner && <div>*/}
            {/*    <Button type="primary" onClick={props.goToEditMode}>Редактировать</Button>*/}
            {/*</div>}*/}
        </div>
    )
};

export default ProfileInfo;
