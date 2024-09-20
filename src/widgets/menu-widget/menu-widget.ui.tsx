import React, {useCallback, useEffect} from "react";
import {AccountBox, ChatBubble, Groups, LibraryBooks} from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TocIcon from '@mui/icons-material/Toc';
import {Avatar, Badge} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {SideBlock} from "shared";
import useWebSocket, {useAppDispatch} from "shared/hook/hooks";
import {NO_AVATAR, SocketEvents} from "shared/lib/DictConstants";
import {pathKeys} from "shared/lib/react-router";
import {appSlice} from "shared/model";
import {getInfoNotifications, getMsgNotifications} from "shared/model/app/app-selectors";
import {getMyProfileAvatar, getMyProfileFullName} from "shared/model/profile/profile-selectors";
import styles from "./menu-widget.module.scss";

type IItem = {
    name: string,
    link: string,
    icon: React.JSX.Element
}

export const MenuWidget: React.FC<{ userId: string }> = ({userId}) => {

    const items: IItem[] = [
        {name: 'Профиль', link: `/user/${userId}`, icon: <AccountBox/>},
        {name: 'Лента', link: pathKeys.root, icon: <LibraryBooks/>},
        {name: 'Все пользователи', link: pathKeys.users.root(), icon: <Groups/>},
        // {name: 'Планы питания', link: pathKeys.diet.root(), icon: <TocIcon/>},
    ];

    const avatar = useSelector(getMyProfileAvatar);
    const fullName = useSelector(getMyProfileFullName);
    const notifications = useSelector(getInfoNotifications);
    const msgs = useSelector(getMsgNotifications);

    const dispatch = useAppDispatch();

    const ws = useWebSocket();
    const handleWS = useCallback(
        (e: any) => {
            const {type, data, msg} = JSON.parse(e.data);
            if(type === SocketEvents.FOLLOW_EVENT) {
                dispatch(appSlice.appActions.addNotification({type: 'app/addNotification', payload: msg}))
            }
            if(type === SocketEvents.AUTH_EVENT) {
                dispatch(appSlice.appActions.setUsersOnline({type: 'app/addUserOnline', payload: data}))
            }
            if(type === SocketEvents.FRIEND_EVENT) {
                dispatch(appSlice.appActions.addNotification({type: 'app/addNotification', payload: msg}))
            }
            if(type === SocketEvents.MSG_EVENT && data.from._id !== userId) {
                dispatch(appSlice.appActions.addNotification({type: 'app/addNotification', payload: msg}))
            }
        },
        [dispatch]
    );

    useEffect(() => {
        if(!ws) return;

        ws.addEventListener('message', handleWS);
        return () => ws.removeEventListener('message', handleWS);
    }, [handleWS, ws]);

    return <SideBlock title={fullName}
                      icon={
                          <IconButton sx={{p: 0}}>
                              <Avatar alt={fullName} src={(avatar && `data:image/jpeg;base64,${avatar.data}`) || NO_AVATAR}/>
                          </IconButton>
                      }>

        <Stack sx={{width: '100%'}} direction={'row'} alignItems={'center'} justifyContent={'space-around'} height={'100%'}>
            <Badge badgeContent={notifications.length} color="warning">
                {/*<Link to={pathKeys.dialogs()}>*/}
                <NotificationsIcon color='primary'/>
                {/*</Link>*/}

            </Badge>

            <Badge badgeContent={msgs.length} color="warning">
                {/*<Link to={pathKeys.dialogs()}>*/}
                    <ChatBubble color='primary'/>
                {/*</Link>*/}
            </Badge>


            <Groups color='primary'/>
        </Stack>

        <>
            {items.map((item, i) =>
                <ListItem key={i} disablePadding className={styles.linkItem}>
                    <ListItemButton>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <Link className={styles.link} to={item.link}>
                            <ListItemText primary={item.name}/>
                        </Link>
                    </ListItemButton>
                </ListItem>
            )}
        </>
    </SideBlock>
}  
