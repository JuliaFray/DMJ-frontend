import React from "react";
import {AccountBox, ChatBubble, Groups, LibraryBooks} from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {Avatar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {SideBlock} from "shared";
import {NO_AVATAR} from "shared/lib/DictConstants";
import {pathKeys} from "shared/lib/react-router";
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
        // {name: 'Сообщения', link: pathKeys.dialogs(), icon: <ChatBubble/>},
        {name: 'Публикации', link: pathKeys.root, icon: <LibraryBooks/>},
        // {name: 'Все пользователи', link: pathKeys.users.root(), icon: <Groups/>}
    ];

    const avatar = useSelector(getMyProfileAvatar);
    const fullName = useSelector(getMyProfileFullName);

    return <SideBlock title={fullName}
                      icon={
                          <IconButton sx={{p: 0}}>
                              <Avatar alt={fullName} src={(avatar && `data:image/jpeg;base64,${avatar.data}`) || NO_AVATAR}/>
                          </IconButton>
                      }>

        <Stack sx={{width: '100%'}} direction={'row'} alignItems={'center'} justifyContent={'space-around'} height={'100%'}>
            <NotificationsIcon color='primary'/>
            <ChatBubble color='primary'/>
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
