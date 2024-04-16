import {IContact, IProfile} from '../../../types/types';
import React from 'react';
import styles from './ProfileInfo.module.scss';
import {getFullName} from '../../../Utils/helper';
import {Divider, ListItem, ListItemText} from '@mui/material';
import List from '@mui/material/List';
import EditProfileField from './EditProfileField';
import {useSelector} from 'react-redux';
import {getStats} from '../../../redux/profile/profile-selectors';


type IProfileData = {
    profile: IProfile,
    isOwner: boolean,
    editMode: boolean
}

const ProfileData: React.FC<IProfileData> = React.memo((props) => {

    const stats = useSelector(getStats);

    return (
        <div className={styles.profileData}>
            <div className={styles.profileHeader}>
                <span className={styles.profileName}>
                     {getFullName(props.profile)}
                </span>

                <span>
                    Online
                </span>
            </div>

            <Divider key={'divider1'} className={styles.divider}/>

            <List dense={true} className={styles.profileInfo}>
                <ListItem key={'ageList'}>
                    <ListItemText key={'ageT'} primary='День рождения:'/>
                    <EditProfileField editMode={props.editMode} name={'age'}
                                      value={props.profile.age} type={'date'}/>
                </ListItem>

                <ListItem key={'cityList'}>
                    <ListItemText key={'cityT'} primary='Город:'/>
                    <EditProfileField editMode={props.editMode} name={'city'} placeholder={'Город'}
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
                    <EditProfileField editMode={props.editMode} name={'description'} placeholder={'О себе'}
                                      value={props.profile.description} type={'string'}/>
                </ListItem>
            </List>

            <Divider key={'divider2'} className={styles.divider}/>

            <div className={styles.stats}>
                <ListItem key={'postsList'}>
                    <ListItemText key={'posts'} primary='Посты'/>
                    <ListItemText key={'postsT'} primary={stats?.posts || 0}/>
                </ListItem>

                <ListItem key={'favoriteList'}>
                    <ListItemText key={'favorite'} primary='Избранное'/>
                    <ListItemText key={'favoriteT'} primary={stats?.favorites || 0}/>
                </ListItem>

                <ListItem key={'ratingList'}>
                    <ListItemText key={'rating'} primary='Рейтинг'/>
                    <ListItemText key={'ratingT'} primary={stats?.rating || 0}/>
                </ListItem>

                <ListItem key={'friendsList'}>
                    <ListItemText key={'friends'} primary='Друзья'/>
                    <ListItemText key={'friendsT'} primary={stats?.friends || 0}/>
                </ListItem>
            </div>
        </div>
    )
});

export default ProfileData;
