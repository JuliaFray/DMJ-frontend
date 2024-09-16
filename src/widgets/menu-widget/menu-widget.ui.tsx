import React from "react";
import {AccountBox, ChatBubble, Groups, LibraryBooks} from "@mui/icons-material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {Link} from "react-router-dom";
import {SideBlock} from "shared";
import {pathKeys} from "shared/lib/react-router";
import styles from "../../Components/Header/Header.module.scss";

type IItem = {
    name: string,
    link: string,
    icon: React.JSX.Element
}

export const MenuWidget: React.FC<{ userId: string }> = ({userId}) => {
    const items: IItem[] = [
        {name: 'Профиль', link: pathKeys.users.byId(userId), icon: <AccountBox/>},
        {name: 'Сообщения', link: pathKeys.dialogs(), icon: <ChatBubble/>},
        {name: 'Публикации', link: pathKeys.root, icon: <LibraryBooks/>},
        {name: 'Все пользователи', link: pathKeys.users.root(), icon: <Groups/>}
    ];

    return <SideBlock title='Меню'>
        {items.map((item, i) =>
            <ListItem key={i} disablePadding>
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
    </SideBlock>
}  
