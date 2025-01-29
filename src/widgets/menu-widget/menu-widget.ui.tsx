import React, { useCallback, useEffect } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useWebSocket, { useAppDispatch } from "shared/hook/hooks";
import { NO_AVATAR, SocketEvents } from "shared/lib/DictConstants";
import { pathKeys } from "shared/lib/react-router";
import { v4 as uuidv4 } from "uuid";

import { ChatBubble, Groups, LibraryBooks } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TocIcon from "@mui/icons-material/Toc";
import { Avatar, Badge } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";

import {
  appActions,
  getAppInfoNotifications,
  getAppMsgNotifications,
  getMyProfileAvatar,
  getMyProfileFullName,
  getMyProfileShortName,
  SideBlock,
} from "shared";

import styles from "./menu-widget.module.scss";

type IItem = {
  name: string;
  link: string;
  icon: React.JSX.Element;
};

export const MenuWidget: React.FC<{ userId: string }> = ({ userId }) => {
  const items: IItem[] = [
    { name: "Лента", link: pathKeys.root, icon: <LibraryBooks /> },
    { name: "Все пользователи", link: pathKeys.users.root(), icon: <Groups /> },
    { name: "Планы питания", link: pathKeys.diet.root(), icon: <TocIcon /> },
  ];

  const avatar = useSelector(getMyProfileAvatar);
  const fullName = useSelector(getMyProfileFullName);
  const shortName = useSelector(getMyProfileShortName);
  const notifications = useSelector(getAppInfoNotifications);
  const msgs = useSelector(getAppMsgNotifications);

  const dispatch = useAppDispatch();

  const ws = useWebSocket();
  const handleWS = useCallback(
    (e: any) => {
      const { type, data, msg } = JSON.parse(e.data);
      if (type === SocketEvents.FOLLOW_EVENT) {
        dispatch(
          appActions.addNotification({
            type: "app/addNotification",
            payload: msg,
          })
        );
      }
      if (type === SocketEvents.AUTH_EVENT) {
        dispatch(
          appActions.setUsersOnline({
            type: "app/addUserOnline",
            payload: data,
          })
        );
      }
      if (type === SocketEvents.FRIEND_EVENT) {
        dispatch(
          appActions.addNotification({
            type: "app/addNotification",
            payload: msg,
          })
        );
      }
      if (type === SocketEvents.MSG_EVENT && data.from._id !== userId) {
        dispatch(
          appActions.addNewMsgCounter({
            type: "app/addNewMsgCounter",
            payload: {},
          })
        );
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (!ws) return;

    ws.addEventListener("message", handleWS);
    return () => ws.removeEventListener("message", handleWS);
  }, [handleWS, ws]);

  return (
    <SideBlock
      title={shortName}
      link={`/user/${userId}`}
      icon={
        <IconButton sx={{ p: 0 }}>
          <Avatar
            alt={fullName}
            src={
              (avatar && `data:image/jpeg;base64,${avatar.data}`) || NO_AVATAR
            }
          />
        </IconButton>
      }
    >
      <Stack
        sx={{ width: "100%" }}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-around"}
        height={"100%"}
      >
        <Badge badgeContent={notifications.length} color="warning">
          {/*<Link to={pathKeys.dialogs()}>*/}
          <NotificationsIcon color="primary" />
          {/*</Link>*/}
        </Badge>

        <Badge badgeContent={msgs} color="warning">
          <Link to={pathKeys.dialogs()}>
            <ChatBubble color="primary" />
          </Link>
        </Badge>

        <Groups color="primary" />
      </Stack>

      <>
        {items.map((item, i) => (
          <Link key={uuidv4()} className={styles.linkItem} to={item.link}>
            <ListItem key={uuidv4()} disablePadding>
              <ListItemButton key={uuidv4()}>
                <ListItemIcon key={uuidv4()}>{item.icon}</ListItemIcon>
                <ListItemText key={uuidv4()} primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </>
    </SideBlock>
  );
};
