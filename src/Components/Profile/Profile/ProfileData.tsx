import React, {Dispatch, SetStateAction} from 'react';
import {Article, Grade, ImportExport, Insights, People} from '@mui/icons-material';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import {ListItem, ListItemText, Tooltip} from '@mui/material';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {getStats} from '../../../redux/profile/profile-selectors';
import {IProfile, IProfileStats} from '../../../types/types';
import {getFullName} from '../../../Utils/helper';
import EditProfileField from './EditProfileField';
import styles from './ProfileInfo.module.scss';


type IProfileData = {
    profile: IProfile,
    isOwner: boolean,
    editMode: boolean,
    state: IProfile | null,
    setState: Dispatch<SetStateAction<IProfile>>
}

const ProfileData: React.FC<IProfileData> = React.memo((props) => {

    const stats = useSelector(getStats);

    return (
        <>
            <div className={styles.profileHeader}>{getFullName(props.profile)}</div>

            <List dense={true} className={styles.profileList}>
                <ListItem key={'regList'}>
                    <ListItemText key={'regT'} primary='Дата регистрации:'/>
                    <div className={styles.editFields}>
                        <ListItemText key={'reg'} primary={moment(props.profile.createdAt).format('DD.MM.yyyy')}/>
                    </div>

                </ListItem>

                <ListItem key={'ageList'}>
                    <ListItemText key={'ageT'} primary='День рождения:'/>
                    <EditProfileField editMode={props.editMode} name={'age'} state={props.state}
                                      value={props.profile.age} type={'date'} setState={props.setState}/>
                </ListItem>

                <ListItem key={'cityList'}>
                    <ListItemText key={'cityT'} primary='Город:'/>
                    <EditProfileField editMode={props.editMode} name={'city'} placeholder={'Город'}
                                      value={props.profile.city} type={'string'} state={props.state} setState={props.setState}/>
                </ListItem>

                <ListItem key={'profileList'}>
                    <ListItemText key={'profile'} primary='О себе:'/>
                    <EditProfileField editMode={props.editMode} name={'description'} placeholder={'О себе'}
                                      value={props.profile.description} type={'textarea'} state={props.state} setState={props.setState}/>
                </ListItem>
            </List>

            <ListItems stats={stats}/>
        </>
    )
});


const ListItems: React.FC<{ stats: IProfileStats | null }> = ({stats}) => {
    const items = [
        {name: 'comments', value: 'Комментарии', icon: <CommentIcon color={'disabled'}/>},
        {name: 'posts', value: 'Публикации', icon: <Article color={'disabled'}/>},
        {name: 'favorites', value: 'Избранное', icon: <Grade color={'disabled'}/>},
        {name: 'rating', value: 'Рейтинг', icon: <Insights color={'disabled'}/>},
        {name: 'marks', value: 'Оценки', icon: <ImportExport color={'disabled'}/>},
        {name: 'followers', value: 'Подписки', icon: <People color={'disabled'}/>},
    ];

    return (
        <div className={styles.stats}>
            {items.filter(key => stats && +stats[key.name] >= 0).map(key => <Tooltip key={key.name + '_tooltip'} title={key.value}>
                <ListItem key={key.name + '_item'}>
                    <ListItemIcon key={key.name + '_icon'}>{key.icon}</ListItemIcon>
                    <ListItemText key={key.name} primary={stats ? stats[key.name] : 0}/>
                </ListItem>
            </Tooltip>)}
        </div>
    );
}

export default ProfileData;
