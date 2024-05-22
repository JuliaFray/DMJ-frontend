import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getAuthId, getIsAuth} from '../../redux/auth/auth-selectors';
import useWebSocket, {useAppDispatch} from '../../hook/hooks';
import IconButton from '@mui/material/IconButton';
import {AppBar, Box, Button, Fade, Popper, Toolbar, Typography} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import styles from './Header.module.scss';
import {SocketEvents} from '../../Utils/DictConstants';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {getNotifications} from '../../redux/app/app-selectors';
import {appActions} from '../../redux/app/app-slice';
import reactStringReplace from 'react-string-replace';
import {v4 as uuidv4} from 'uuid';
import Divider from '@mui/material/Divider';
import {toggleFriendProfile} from '../../redux/profile/profile-thunks';
import HeaderMenu from './HeaderMenu';
import {INotifications} from '../../types/types';


const HeaderComponent: React.FC = () => {

    const [showNotification, setShowNotification] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const userId = useSelector(getAuthId);
    const isAuth = useSelector(getIsAuth);
    const notifications = useSelector(getNotifications);
    const dispatch = useAppDispatch();

    const ws = useWebSocket();
    const handleWS = useCallback(
        (e: any) => {
            const {type, data, msg} = JSON.parse(e.data);
            if(type === SocketEvents.FOLLOW_EVENT) {
                dispatch(appActions.addNotification({type: 'app/addNotification', payload: msg}))
            }
            if(type === SocketEvents.AUTH_EVENT) {
                dispatch(appActions.addUserOnline({type: 'app/addUserOnline', payload: data}))
            }
            if(type === SocketEvents.FRIEND_EVENT) {
                dispatch(appActions.addNotification({type: 'app/addNotification', payload: msg}))
            }
            if(type === SocketEvents.MSG_EVENT && data.from._id !== userId) {
                dispatch(appActions.addNotification({type: 'app/addNotification', payload: msg}))
            }
        },
        [dispatch]
    );

    useEffect(() => {
        if(!ws) return;

        ws.addEventListener('message', handleWS);
        return () => ws.removeEventListener('message', handleWS);
    }, [handleWS, ws]);

    const onShowNotification = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setShowNotification((prev) => !prev);
    }

    const handleReadAll = () => {
        dispatch(appActions.removeNotification());
        setShowNotification((prev) => !prev);
    }


    return (
        <Box sx={{flexGrow: 1}} className={styles.header}>
            <AppBar position='static'>
                <Toolbar>
                    {isAuth && <>

                        <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                            <Link to={'/posts'}>BLOG</Link>
                        </Typography>

                        <IconButton id={'ntf'} onClick={onShowNotification} aria-label='notifications' sx={{marginRight: '20px'}}>
                            {!!notifications.length ? <NotificationsActiveIcon color='warning'/> : <NotificationsIcon color='success'/>}
                        </IconButton>
                        <Popper id={'ntf'} open={showNotification} anchorEl={anchorEl} transition className={styles.notifications}>
                            {({TransitionProps}) => (
                                <Fade {...TransitionProps} timeout={350}>
                                    <Box sx={{border: 1, p: 1, bgcolor: 'background.paper', borderColor: '#026670'}}>
                                        <List dense={true}>
                                            {!!notifications.length
                                                ? notifications.map(it => <NotificationItem key={uuidv4()} item={it}/>)
                                                : <NotificationItem key={uuidv4()} text='Уведомлений нет'/>}

                                            <ListItem key={uuidv4()} className={styles.item}>
                                                <ListItemButton className={styles.btn} onClick={handleReadAll}>
                                                    <ListItemText primary={'Отметить все прочитанными'}/>
                                                </ListItemButton>
                                            </ListItem>
                                        </List>

                                    </Box>
                                </Fade>
                            )}
                        </Popper>
                        <HeaderMenu userId={userId}/>

                    </>}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

const NotificationTypes = {
    FOLLOW: 'FOLLOW',
    FRIEND: 'FRIEND',
    MSG: 'MSG'
}

const NotificationItem: React.FC<{ item?: INotifications, text?: string }> = ({item, text}, context) => {
    const dispatch = useAppDispatch();
    const userId = useSelector(getAuthId);

    if(!item) {
        return (
            <>
                <ListItem key={uuidv4()} className={styles.item}>
                    <ListItemText primary={text}/>
                </ListItem>
                <Divider/>
            </>
        )
    }

    const toggleAgree = (isAgree: boolean) => {
        dispatch(toggleFriendProfile(
            {userId: userId, query: `?fromId=${item.fromId}&isAgree=${isAgree}`}
        ))
    }

    if(item.type === NotificationTypes.FOLLOW || item.type === NotificationTypes.MSG) {
        return (
            <>
                <ListItem key={uuidv4()} className={styles.item}>
                    <ListItemText primary={reactStringReplace(item.msg, '%s',
                        (match, i) => <Link to={`/users/${item.fromId}`}>{item.from}</Link>
                    )}/>
                </ListItem>
                <Divider/>
            </>
        )
    }

    if(item.type === NotificationTypes.FRIEND) {
        return (
            <>
                <ListItem key={uuidv4()} className={styles.item}>
                    <ListItemText primary={reactStringReplace(item.msg, '%s',
                        (match, i) => <Link to={`/users/${item.fromId}`}>{item.from}</Link>
                    )}/>
                    <ListItem className={styles.subItem}>
                        <Button size='small' variant='outlined' color={'error'} onClick={() => toggleAgree(false)}>
                            Отклонить
                        </Button>

                        <Button size='small' variant='outlined' color={'primary'} onClick={() => toggleAgree(true)}>
                            Принять
                        </Button>
                    </ListItem>
                </ListItem>
                <Divider/>
            </>
        )
    }
    return <ListItem key={uuidv4()} className={styles.item}>Уведомлений нет</ListItem>
}

export default HeaderComponent;
