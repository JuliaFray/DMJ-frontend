import {IContact, IProfile, IProfileStats} from '../../../types/types';
import React from 'react';
import styles from './ProfileInfo.module.scss';
import {getFullName} from '../../../Utils/helper';
import {Divider, ListItem, ListItemText} from '@mui/material';
import List from '@mui/material/List';
import EditProfileField from './EditProfileField';
import {useSelector} from 'react-redux';
import {getStats} from '../../../redux/profile/profile-selectors';
import {Article, Grade, Insights, People} from '@mui/icons-material';
import ListItemIcon from '@mui/material/ListItemIcon';


type IProfileData = {
    profile: IProfile,
    isOwner: boolean,
    editMode: boolean
}

const ProfileData: React.FC<IProfileData> = React.memo((props) => {

    const stats = useSelector(getStats);

    return (
        <>
            <div className={styles.profileHeader}>
                <span className={styles.profileName}>
                     {getFullName(props.profile)}
                </span>

                <span>
                    Online
                </span>
            </div>

            <Divider key={'divider1'} className={styles.divider}/>

            <List dense={true} className={styles.profileList}>
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

            <ListItems stats={stats}/>
        </>
    )
});


const ListItems: React.FC<{ stats: IProfileStats | null }> = ({stats}) => {
    const items = [
        {name: 'posts', value: 'Посты', icon: <Article color={'disabled'}/>},
        {name: 'favorites', value: 'Избранное', icon: <Grade color={'disabled'}/>},
        {name: 'rating', value: 'Рейтинг', icon: <Insights color={'disabled'}/>},
        {name: 'friends', value: 'Друзья', icon: <People color={'disabled'}/>},
    ];

    return (
        <div className={styles.stats}>
            {items.map(key => <ListItem key={key.name + '_item'}>
                <ListItemIcon key={key.name + '_icon'}>{key.icon}</ListItemIcon>
                <ListItemText key={key.name} primary={stats ? stats[key.name] : 0}/>
            </ListItem>)}
        </div>
    );
}

export default ProfileData;
