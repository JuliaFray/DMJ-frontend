import React, {ChangeEvent, useRef, useState} from 'react';
import {IContact, IProfile} from '../../../types/types';
import {NO_AVATAR} from '../../../Utils/DictConstants';
import {CircularProgress, Divider, Grid, ListItem, ListItemText} from '@mui/material';
import styles from '../ProfileInfo/ProfileInfo.module.scss';
import Avatar from '@mui/material/Avatar';
import {ProfileTabs} from './ProfileTabs';
import {useDispatch, useSelector} from 'react-redux';
import {saveProfilePhoto} from '../../../redux/profile/profile-thunks';
import {getProfileAvatar} from '../../../redux/profile/profile-selectors';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import {getFullName, getImage} from '../../../Utils/helper';

type PropsType = {
    profile: IProfile | null,
    isOwner: boolean
}

const ProfileInfo: React.FC<PropsType> = React.memo(({profile, isOwner}) => {

    const [onHover, setOnHover] = useState(false);
    const [editMode, setEditMode] = useState(false);

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

    return (
        <Grid className={styles.profile} container
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch">
            <Grid container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="stretch" columnSpacing={2} className={styles.mainBlock}>
                <Grid item xs={3} className={styles.profileMain}>
                    {/*{onHover && <IconButton aria-label="delete" size="large" className={styles.avatar}*/}
                    {/*                        onClick={() => inputRef.current?.click()}>*/}
                    {/*    <AddIcon className={styles.avatar}*/}
                    {/*             onMouseOut={() => setOnHover(false)}>*/}
                    {/*    </AddIcon>*/}
                    {/*</IconButton>}*/}
                    {/*<input ref={inputRef} type='file' onChange={handleChangeFile} hidden/>*/}
                    <Avatar variant="rounded"
                            className={styles.avatar}
                            src={getImage(profile.avatar, true)}
                            alt={profile.firstName}/>
                    {/*{!onHover && <Avatar variant="rounded"*/}
                    {/*                     onMouseOver={() => setOnHover(true)}*/}
                    {/*                     className={styles.avatar}*/}
                    {/*                     src={url}*/}
                    {/*                     alt={profile.firstName}/>}*/}

                    {isOwner && <Button className={styles.button} variant="outlined">Редактировать</Button>}

                </Grid>

                <Grid item xs={8} className={styles.profileInfo}>
                    <ProfileData profile={profile} isOwner={isOwner}/>
                </Grid>

            </Grid>

            <Divider/>

            <ProfileTabs isOwner={isOwner} userId={profile._id}/>

        </Grid>

    )
});

type ProfileDataPropsType = {
    profile: IProfile,
    isOwner: boolean
}

const ProfileData: React.FC<ProfileDataPropsType> = React.memo((props) => {
    return (
        <div className={styles.profileData}>
            <div className={styles.statusData}>
                <span className={styles.name}>
                     {getFullName(props.profile)}
                </span>

                <span>
                    Online
                </span>
            </div>

            <Divider className={styles.divider}/>

            <List dense={true} className={styles.infoData}>
                <ListItem className={styles.li}>
                    <ListItemText primary='День рождения:'/>
                    <ListItemText primary={props.profile.age}/>
                </ListItem>

                <ListItem>
                    <ListItemText primary='Город:'/>
                    <ListItemText primary={props.profile.city}/>
                </ListItem>

                {props?.profile?.contacts && Object.keys(props?.profile?.contacts).map(key => {
                    return (
                        <ListItem>
                            <ListItemText primary={key}/>
                            <ListItemText primary={props?.profile?.contacts[key as keyof IContact]}/>
                        </ListItem>)

                })}

                <ListItem>
                    <ListItemText primary='О себе:'/>
                    <ListItemText primary={props.profile.description}/>
                </ListItem>
            </List>

            <Divider className={styles.divider}/>

            <div>
                stats
            </div>
        </div>
    )
});

export default ProfileInfo;
