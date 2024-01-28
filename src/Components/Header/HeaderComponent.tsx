import React from 'react';
import {useDispatch} from 'react-redux';
import '../../styles/main.less';
import {authActions} from '../../redux/auth/auth-slice';
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
import Divider from '@mui/material/Divider';


type Anchor = 'top' | 'left' | 'bottom' | 'right';

const HeaderComponent: React.FC = () => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(authActions.logout())
    };

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const list = (anchor: Anchor) => (
        <Box
            sx={{width: 250}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Профиль'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {['Чат'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if(
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({...state, [anchor]: open});
            };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
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
                        BLOG
                    </Typography>
                    <IconButton onClick={onLogout} color="info" aria-label="logout">
                        <Logout/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default HeaderComponent;
