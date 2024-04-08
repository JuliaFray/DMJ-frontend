import {IContact, IProfile} from '../../../types/types';
import React, {useEffect, useState} from 'react';
import styles from './ProfileInfo.module.scss';
import {getFullName} from '../../../Utils/helper';
import {Divider, ListItem, ListItemText} from '@mui/material';
import List from '@mui/material/List';
import EditProfileField from './EditProfileField';
import {useAppDispatch} from '../../../hook/hooks';


type IProfileData = {
    profile: IProfile,
    isOwner: boolean,
    editMode: boolean
}

const ProfileData: React.FC<IProfileData> = React.memo((props) => {

    const [stats, setStats] = useState<Record<string, string>>({});

    const dispatch = useAppDispatch();

    useEffect(() => {

    }, [dispatch]);


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

            <Divider key={'divider1'} className={styles.divider}/>

            <List dense={true} className={styles.infoData}>
                <ListItem key={'ageList'}>
                    <ListItemText key={'ageT'} primary='День рождения:'/>
                    <EditProfileField editMode={props.editMode} name={'age'}
                                      value={props.profile.age} type={'date'}/>
                </ListItem>

                <ListItem key={'cityList'}>
                    <ListItemText key={'cityT'} primary='Город:'/>
                    <EditProfileField editMode={props.editMode} name={'city'}
                                      value={props.profile.city} type={'string'}/>
                </ListItem>

                {props?.profile?.contacts && Object.keys(props?.profile?.contacts).map(key => {
                    return (
                        <ListItem key={key + 'List'}>
                            <ListItemText key={key} primary={key}/>
                            <EditProfileField editMode={props.editMode} name={key} type={'string'}
                                              value={props?.profile?.contacts[key as keyof IContact]}/>
                        </ListItem>)

                })}

                <ListItem key={'profileList'}>
                    <ListItemText key={'profile'} primary='О себе:'/>
                    <EditProfileField editMode={props.editMode} name={'description'}
                                      value={props.profile.description} type={'string'}/>
                </ListItem>
            </List>

            <Divider key={'divider2'} className={styles.divider}/>

            <div className={styles.stats}>
                <ListItem key={'postsList'}>
                    <ListItemText key={'posts'} primary='Посты'/>
                    <ListItemText key={'postsT'} primary={stats.posts || 0}/>
                </ListItem>

                <ListItem key={'favoriteList'}>
                    <ListItemText key={'favorite'} primary='Избранное'/>
                    <ListItemText key={'favoriteT'} primary={stats.favorites || 0}/>
                </ListItem>

                <ListItem key={'likeList'}>
                    <ListItemText key={'like'} primary='Нравится'/>
                    <ListItemText key={'likeT'} primary={stats.likes || 0}/>
                </ListItem>

                <ListItem key={'friendsList'}>
                    <ListItemText key={'friends'} primary='Друзья'/>
                    <ListItemText key={'friendsT'} primary={stats.friends || 0}/>
                </ListItem>
            </div>
        </div>
    )
});

export default ProfileData;
