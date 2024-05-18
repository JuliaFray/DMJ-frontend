import React, {useState} from 'react';
import {Avatar, Box, Menu, SwipeableDrawer} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import styles from './Header.module.scss';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import {Link} from 'react-router-dom';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import {AccountBox, ChatBubble, Groups, LibraryBooks} from '@mui/icons-material';
import List from '@mui/material/List';
import useWebSocket, {useAppDispatch} from '../../hook/hooks';
import {NO_AVATAR, SocketEvents} from '../../Utils/DictConstants';
import {authActions} from '../../redux/auth/auth-slice';
import {useSelector} from 'react-redux';
import {getMyProfileAvatar, getMyProfileFullName} from '../../redux/profile/profile-selectors';


type IItem = {
    name: string,
    link: string,
    icon: React.JSX.Element
}

const HeaderMenu: React.FC<{ userId: string }> = (props, context) => {

    const avatar = useSelector(getMyProfileAvatar);
    const profileName = useSelector(getMyProfileFullName);

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [showMenu, setShowMenu] = useState(false);

    const ws = useWebSocket();
    const dispatch = useAppDispatch();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
        // setShowMenu(true);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onLogout = () => {
        if(props.userId) {
            ws?.send(JSON.stringify({type: SocketEvents.LOGOUT_EVENT, id: props.userId}));
        }
        dispatch(authActions.logout());
    };

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

    const items: IItem[] = [
        {name: 'Публикации', link: `/posts`, icon: <LibraryBooks/>},
        {name: 'Профиль', link: `/users/${props.userId}`, icon: <AccountBox/>},
        {name: 'Все пользователи', link: `/users`, icon: <Groups/>},
        {name: 'Сообщения', link: `/dialogs`, icon: <ChatBubble/>}
    ];

    const list = () => (
        <Box sx={{width: 250}}
             role='presentation'
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
                <Divider/>
                <ListItem key={'out'} disablePadding className={styles.linkItem} onClick={onLogout}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Logout/>
                        </ListItemIcon>
                        <ListItemText primary={'Выйти'}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );


    return (
        <>
            <Box sx={{flexGrow: 0}}>
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <Avatar alt={profileName} src={(avatar && `data:image/jpeg;base64,${avatar.data}`) || NO_AVATAR}/>
                </IconButton>
                <Menu sx={{mt: '45px'}} id="menu-appbar"
                      anchorEl={anchorElUser} anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                      keepMounted transformOrigin={{vertical: 'top', horizontal: 'right'}}
                      open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>

                    {items.map((item: IItem, index) => (
                        <ListItem key={index} disablePadding className={styles.linkItem}>
                            <ListItemButton onClick={handleCloseUserMenu}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <Link className={styles.link} to={item.link}>
                                    <ListItemText primary={item.name}/>
                                </Link>
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <Divider/>
                    <ListItem key={'out'} disablePadding className={styles.linkItem} onClick={onLogout}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Logout/>
                            </ListItemIcon>
                            <ListItemText primary={'Выйти'}/>
                        </ListItemButton>
                    </ListItem>

                </Menu>

                <SwipeableDrawer open={showMenu}
                                 onClose={toggleDrawer(false)}
                                 onOpen={toggleDrawer(true)}>
                    {list()}
                </SwipeableDrawer>
            </Box>
        </>
    )
};


export default HeaderMenu;