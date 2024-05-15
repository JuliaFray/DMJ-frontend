import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {authActions} from '../../redux/auth/auth-slice';
import {getAuthId, getIsAuth} from '../../redux/auth/auth-selectors';
import useWebSocket, {useAppDispatch} from '../../hook/hooks';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import {AppBar, Box, Button, Fade, Popper, Toolbar, Tooltip, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {AccountBox, ChatBubble, Groups, LibraryBooks} from '@mui/icons-material';
import styles from './Header.module.scss';
import {SocketEvents} from '../../Utils/DictConstants';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {getNotifications} from '../../redux/app/app-selectors';
import {appActions, INotifications} from '../../redux/app/app-slice';
import reactStringReplace from 'react-string-replace';
import {v4 as uuidv4} from 'uuid';
import Divider from '@mui/material/Divider';
import {toggleFriendProfile} from '../../redux/profile/profile-thunks';


type IItem = {
    name: string,
    link: string,
    icon: React.JSX.Element
}

const HeaderComponent: React.FC = () => {

    const userId = useSelector(getAuthId);
    const isAuth = useSelector(getIsAuth);
    const notifications = useSelector(getNotifications);
    const dispatch = useAppDispatch();

    const ws = useWebSocket();
    const handleWS = useCallback(
        (e: any) => {
            const {type, data} = JSON.parse(e.data);
            if(type === SocketEvents.FOLLOW_EVENT) {
                dispatch(appActions.addNotification({type: 'app/addNotification', payload: data}))
            }
            if(type === SocketEvents.AUTH_EVENT) {
                dispatch(appActions.addUserOnline({type: 'app/addUserOnline', payload: data}))
            }
            if(type === SocketEvents.FRIEND_EVENT) {
                dispatch(appActions.addNotification({type: 'app/addNotification', payload: data}))
            }
        },
        [dispatch]
    );

    useEffect(() => {
        if(!ws) return;

        ws.addEventListener("message", handleWS);
        return () => ws.removeEventListener("message", handleWS);
    }, [handleWS, ws]);


    const [showMenu, setShowMenu] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const items: IItem[] = [
        {name: 'Блог', link: `/posts`, icon: <LibraryBooks/>},
        {name: 'Профиль', link: `/users/${userId}`, icon: <AccountBox/>},
        {name: 'Все пользователи', link: `/users`, icon: <Groups/>},
        {name: 'Сообщения', link: `/dialogs`, icon: <ChatBubble/>}
    ];

    const onLogout = () => {
        if(userId) {
            ws?.send(JSON.stringify({type: SocketEvents.LOGOUT_EVENT, id: userId}));
        }
        dispatch(authActions.logout());
    };

    const onShowNotification = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setShowNotification((prev) => !prev);
    }

    const handleReadAll = () => {
        dispatch(appActions.removeNotification())
    }

    const list = () => (
        <Box sx={{width: 250}}
             role="presentation"
             onClick={toggleDrawer(false)}
             onKeyDown={toggleDrawer(false)}>
            <List>
                {items.map((item: IItem, index) => (
                    <ListItem key={index} disablePadding className={styles.linkItem}>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <Link className={styles.link} to={item.link}>
                                <ListItemText primary={item.name}/>
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const toggleDrawer = (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if(event && event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }
            setShowMenu(open);
        };

    return (
        <Box sx={{flexGrow: 1}} className={styles.header}>
            <AppBar position="static">
                <Toolbar>
                    {isAuth && <>
                        <IconButton size="large" edge="start" onClick={toggleDrawer(true)}
                                    color="inherit" aria-label="menu" sx={{mr: 2}}>
                            <MenuIcon/>
                        </IconButton>

                        <SwipeableDrawer open={showMenu}
                                         onClose={toggleDrawer(false)}
                                         onOpen={toggleDrawer(true)}>
                            {list()}
                        </SwipeableDrawer>

                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            <Link to={'/posts'}>BLOG</Link>
                        </Typography>

                        <IconButton id={'ntf'} onClick={onShowNotification} aria-label='notifications' sx={{marginRight: '20px'}}>
                            {!!notifications.length ? <NotificationsActiveIcon color='warning'/> : <NotificationsIcon color='success'/>}
                        </IconButton>
                        <Popper id={'ntf'} open={showNotification} anchorEl={anchorEl} transition className={styles.notifications}>
                            {({TransitionProps}) => (
                                <Fade {...TransitionProps} timeout={350}>
                                    <Box sx={{border: 1, p: 1, bgcolor: 'background.paper'}}>
                                        <List dense={true}>
                                            {!!notifications.length
                                                ? notifications.map(it => <NotificationItem item={it}/>)
                                                : 'Уведомлений нет'}

                                            <ListItem key={uuidv4()} className={styles.item}>
                                                <ListItemButton onClick={handleReadAll}>
                                                    <ListItemText primary={'Отметить все прочитанными'}/>
                                                </ListItemButton>
                                            </ListItem>
                                        </List>

                                    </Box>
                                </Fade>
                            )}
                        </Popper>

                        <Tooltip title='Выйти'>
                            <IconButton onClick={onLogout} color='success' aria-label='logout'>
                                <Logout/>
                            </IconButton>
                        </Tooltip>
                    </>}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

const NotificationTypes = {
    FOLLOW: 'FOLLOW',
    FRIEND: 'FRIEND'
}

const NotificationItem: React.FC<{ item: INotifications }> = (props, context) => {
    const dispatch = useAppDispatch();
    const userId = useSelector(getAuthId);

    const toggleAgree = (isAgree: boolean) => {
        dispatch(toggleFriendProfile(
            {userId: userId, query: `?fromId=${props.item.fromId}&isAgree=${isAgree}`}
        ))
    }

    if(props.item.type === NotificationTypes.FOLLOW) {
        return (
            <>
                <ListItem key={uuidv4()} className={styles.item}>
                    <ListItemText primary={reactStringReplace(props.item.msg, '%s',
                        (match, i) => <Link to={`/users/${props.item.fromId}`}>{props.item.from}</Link>
                    )}/>
                </ListItem>
                <Divider/>
            </>
        )
    }

    if(props.item.type === NotificationTypes.FRIEND) {
        return (
            <>
                <ListItem key={uuidv4()} className={styles.item}>
                    <ListItemText primary={reactStringReplace(props.item.msg, '%s',
                        (match, i) => <Link to={`/users/${props.item.fromId}`}>{props.item.from}</Link>
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
