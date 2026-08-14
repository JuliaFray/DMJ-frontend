import React, { FC, useCallback, useEffect, useState } from 'react';

import {
  ArticleIcon,
  GearSixIcon,
  ListChecksIcon,
  NotePencilIcon,
  RulerIcon,
  SneakerMoveIcon,
} from '@phosphor-icons/react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Group } from '@mantine/core';

import { useAuth, useWebSocket } from 'shared/context';
import { useAppDispatch } from 'shared/hook';
import { pathKeys, SocketEvents } from 'shared/lib';
import { appActions } from 'shared/model';
import { UserButton } from 'shared/ui';

import classes from './NavbarSimple.module.css';

type IItem = {
  name: string;
  link: string;
  icon: any;
  pathname: string;
};

const items: IItem[] = [
  {
    name: 'Дневник питания',
    pathname: 'diary',
    link: pathKeys.diary.root(),
    icon: NotePencilIcon,
  },
  {
    name: 'Планы питания',
    pathname: 'planner',
    link: pathKeys.planner.root(),
    icon: ListChecksIcon,
  },
  { name: 'Тренировки', pathname: 'training', link: pathKeys.root, icon: SneakerMoveIcon },
  {
    name: 'Вес и измерения',
    pathname: 'measure',
    link: pathKeys.measure.root(),
    icon: RulerIcon,
  },
  {
    name: 'Общая лента',
    pathname: 'article',
    link: pathKeys.home(),
    icon: ArticleIcon,
  },
  { name: 'Настройки', pathname: 'settings', link: pathKeys.root, icon: GearSixIcon },
];

interface MenuWidgetProps {
  close: () => void;
}

export const MenuWidget: FC<MenuWidgetProps> = ({ close }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { me, authId } = useAuth();

  const [selected, setSelected] = useState<string | undefined>();

  useEffect(() => {
    setSelected(pathname?.replaceAll('/', ''));
    close();
  }, [pathname]);

  const dispatch = useAppDispatch();

  const ws = useWebSocket();
  const handleWS = useCallback(
    (e: MessageEvent<string>) => {
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
      if (type === SocketEvents.MSG_EVENT && data.from._id !== authId) {
        dispatch(appActions.addNewMsgCounter());
      }
    },
    [dispatch, authId],
  );

  useEffect(() => {
    if (!ws) return;

    ws.addEventListener('message', handleWS);
    return () => ws.removeEventListener('message', handleWS);
  }, [handleWS, ws]);

  const links = items.map((item) => (
    <a
      className={classes.link}
      data-active={selected?.startsWith(item.pathname) || undefined}
      href={item.link}
      key={item.pathname}
      onClick={(event) => {
        event.preventDefault();
        navigate(item.pathname);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.name}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify='space-between'>
          {me && <UserButton user={me} />}
        </Group>
        {links}
      </div>
    </nav>
  );
};
