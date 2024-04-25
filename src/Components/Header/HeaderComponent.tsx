import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {authActions} from '../../redux/auth/auth-slice';
import {getAuthId, getIsAuth} from '../../redux/auth/auth-selectors';
import useWebSocket, {useAppDispatch} from '../../hook/hooks';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import {AppBar, Box, Toolbar, Tooltip, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {AccountBox, ChatBubble, Groups, LibraryBooks} from '@mui/icons-material';
import styles from './Header.module.scss';
import {Events} from '../../Utils/DictConstants';


type IItem = {
    name: string,
    link: string,
    icon: React.JSX.Element
}

const HeaderComponent: React.FC = () => {

    const ws = useWebSocket();

    const userId = useSelector(getAuthId);
    const isAuth = useSelector(getIsAuth);
    const dispatch = useAppDispatch();

    const [showMenu, setShowMenu] = useState(false);

    const items: IItem[] = [
        {name: 'Блог', link: `/posts`, icon: <LibraryBooks/>},
        {name: 'Профиль', link: `/users/${userId}`, icon: <AccountBox/>},
        {name: 'Все пользователи', link: `/users`, icon: <Groups/>},
        {name: 'Сообщения', link: `/dialogs`, icon: <ChatBubble/>}
    ];

    const onLogout = () => {
        if(userId) {
            ws?.send(JSON.stringify({type: Events.LOGOUT_EVENT, id: userId}));
        }
        dispatch(authActions.logout());
    };

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

                        <Tooltip title='Выйти'>
                            <IconButton onClick={onLogout} color="success" aria-label="logout">
                                <Logout/>
                            </IconButton>
                        </Tooltip>
                    </>}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default HeaderComponent;
