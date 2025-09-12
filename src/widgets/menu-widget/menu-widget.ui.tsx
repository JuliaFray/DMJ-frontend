import React, { useCallback, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { LibraryBooks } from '@mui/icons-material';
import TocIcon from '@mui/icons-material/Toc';
import { Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { useAppDispatch, useWebSocket } from 'shared/hook';
import { NO_AVATAR, pathKeys, SocketEvents } from 'shared/lib';
import {
  appActions,
  getAppInfoNotifications,
  getAppMsgNotifications,
  getMyProfileAvatar,
  getMyProfileFullName,
  getMyProfileShortName,
} from 'shared/model';
import { SideBlock } from 'shared/ui';

import styles from './menu-widget.module.scss';

type IItem = {
  name: string;
  link: string;
  icon: React.JSX.Element;
};

export const MenuWidget: React.FC<{ userId: string }> = ({ userId }) => {
  const avatar = useSelector(getMyProfileAvatar);
  const fullName = useSelector(getMyProfileFullName);
  const shortName = useSelector(getMyProfileShortName);
  const notifications = useSelector(getAppInfoNotifications);
  const msgs = useSelector(getAppMsgNotifications);

  const items: IItem[] = [
    { name: 'Планы питания', link: pathKeys.diet.root(), icon: <TocIcon /> },
    { name: 'Лента', link: pathKeys.root, icon: <LibraryBooks /> },
    // {name: "Все пользователи", link: pathKeys.users.root(), icon: <Groups/>},
    // {
    //     name: "Сообщения", link: pathKeys.dialogs(),
    //     icon: <Badge badgeContent={msgs} color="warning">
    //         <ChatBubble/>
    //     </Badge>
    // },
    // {
    //     name: "Уведомления", link: pathKeys.dialogs(),
    //     icon: <Badge badgeContent={notifications.length} color="warning">
    //         <NotificationsIcon/>
    //     </Badge>
    // },
  ];

  const dispatch = useAppDispatch();

  const ws = useWebSocket();
  const handleWS = useCallback(
    (e: any) => {
      const { type, data, msg } = JSON.parse(e.data);
      if (type === SocketEvents.FOLLOW_EVENT) {
        dispatch(
          appActions.addNotification({
            type: 'app/addNotification',
            payload: msg,
          }),
        );
      }
      if (type === SocketEvents.AUTH_EVENT) {
        dispatch(
          appActions.setUsersOnline({
            type: 'app/addUserOnline',
            payload: data,
          }),
        );
      }
      if (type === SocketEvents.FRIEND_EVENT) {
        dispatch(
          appActions.addNotification({
            type: 'app/addNotification',
            payload: msg,
          }),
        );
      }
      if (type === SocketEvents.MSG_EVENT && data.from._id !== userId) {
        dispatch(
          appActions.addNewMsgCounter({
            type: 'app/addNewMsgCounter',
            payload: {},
          }),
        );
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (!ws) return;

    ws.addEventListener('message', handleWS);
    return () => ws.removeEventListener('message', handleWS);
  }, [handleWS, ws]);

  if (!userId) {
    return (
      <SideBlock title='Гость'>
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
      </SideBlock>
    );
  }

  return (
    <SideBlock
      title={shortName}
      link={`/user/${userId}`}
      icon={
        <IconButton sx={{ p: 0 }}>
          <Avatar
            alt={fullName}
            src={(avatar && `data:image/jpeg;base64,${avatar.data}`) || NO_AVATAR}
          />
        </IconButton>
      }
    >
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
    </SideBlock>
  );
};
