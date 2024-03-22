import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import {AppBar, Box, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ListItemText from '@mui/material/ListItemText';
import {authActions} from '../../redux/auth/auth-slice';
import {getAuthId, getIsAuth} from '../../redux/auth/auth-selectors';
import {useAppDispatch} from '../../hook/hooks';
import styles from './Header.module.scss';

type Anchor = 'left';
type ItemType = { name: string, link: string, icon: React.JSX.Element }

const HeaderComponent: React.FC = () => {

    const userId = useSelector(getAuthId);
    const isAuth = useSelector(getIsAuth);
    const dispatch = useAppDispatch();

    const [state, setState] = React.useState({left: false,});

    const items: ItemType[] = [
        {name: 'Блог', link: `/posts`, icon: <InboxIcon/>},
        {name: 'Профиль', link: `/users/${userId}`, icon: <MailIcon/>},
        // {name: 'Все пользователи', link: `/users`, icon: <MailIcon/>},
        // {name: 'Сообщения', link: `/dialogs`, icon: <MailIcon/>},
        // {name: 'Новости', link: `/news`, icon: <MailIcon/>},
        // {name: 'Музыка', link: `/music`, icon: <MailIcon/>},
        // {name: 'Видео', link: `/video`, icon: <MailIcon/>},
        // {name: 'Карты', link: `/map`, icon: <MailIcon/>},
        // {name: 'Настройки', link: `/settings`, icon: <MailIcon/>},
    ];

    const onLogout = () => {
        dispatch(authActions.logout())
    };

    const list = (anchor: Anchor) => (
        <Box
            sx={{width: 250}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {items.map((item: ItemType, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <Link to={item.link}>
                                <ListItemText primary={item.name}/>
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const toggleDrawer = (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if(event && event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setState({...state, [anchor]: open});
        };

    return (
        <Box sx={{flexGrow: 1}} className={styles.header}>
            <AppBar position="static">
                <Toolbar>
                    {isAuth && <>
                        <IconButton size="large" edge="start"
                                    color="inherit" aria-label="menu" sx={{mr: 2}}
                        >
                            <MenuIcon onClick={toggleDrawer('left', true)}>{'left'}</MenuIcon>
                            <SwipeableDrawer
                                anchor={'left'}
                                open={state['left']}
                                onClose={toggleDrawer('left', false)}
                                onOpen={toggleDrawer('left', true)}
                            >
                                {list('left')}
                            </SwipeableDrawer>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            <Link to={'/posts'}>
                                BLOG
                            </Link>
                        </Typography>
                        <IconButton onClick={onLogout} color="info" aria-label="logout">
                            <Logout/>
                        </IconButton>
                    </>}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default HeaderComponent;
