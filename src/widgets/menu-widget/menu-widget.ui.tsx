import React, { useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BallotIcon from '@mui/icons-material/Ballot';
import SettingsIcon from '@mui/icons-material/Settings';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import StraightenIcon from '@mui/icons-material/Straighten';
import { Button, Container, Divider, MenuItem, MenuList, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { useAppDispatch, useWebSocket } from 'shared/hook';
import { pathKeys, SocketEvents } from 'shared/lib';
import { appActions, getMyProfileShortName } from 'shared/model';
import { getProfileEmail } from 'shared/model/profile/profile-selectors';
import { theme } from 'shared/themes';

import styles from './menu-widget.module.scss';

type IItem = {
  name: string;
  link: string;
  icon: React.JSX.Element;
  pathname: string;
};

const items: IItem[] = [
  {
    name: 'Дневник питания',
    pathname: 'diary',
    link: pathKeys.diary.root(),
    icon: <AutoStoriesIcon />,
  },
  {
    name: 'Планы питания',
    pathname: 'planner',
    link: pathKeys.planner.root(),
    icon: <BallotIcon />,
  },
  { name: 'Тренировки', pathname: 'training', link: pathKeys.root, icon: <SportsGymnasticsIcon /> },
  { name: 'Вес и измерения', pathname: 'measure', link: pathKeys.root, icon: <StraightenIcon /> },
  {
    name: 'Общая лента',
    pathname: 'article',
    link: pathKeys.home(),
    icon: <ArticleIcon />,
  },
  { name: 'Настройки', pathname: 'settings', link: pathKeys.root, icon: <SettingsIcon /> },
];

export const MenuWidget: React.FC<{ userId: string }> = ({ userId }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [selected, setSelected] = useState<string | undefined>();

  const shortName = useSelector(getMyProfileShortName);
  const email = useSelector(getProfileEmail);

  useEffect(() => {
    setSelected(pathname?.replaceAll('/', ''));
  }, [pathname]);

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

  return (
    <Container>
      <ListItem className={styles.listItem}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>

        <ListItemText>
          {!userId && <Typography color={theme.palette.text.primary}>Гость</Typography>}
          {!!userId && (
            <>
              <Typography color={theme.palette.text.primary}>{shortName}</Typography>
              <Typography color={theme.palette.text.secondary}>{email}</Typography>
            </>
          )}
        </ListItemText>
      </ListItem>

      {!userId && (
        <Button
          type='button'
          size='large'
          variant='contained'
          fullWidth
          style={{ margin: '8px' }}
          onClick={() => navigate(pathKeys.login())}
        >
          Войти
        </Button>
      )}

      <Divider />

      <MenuList>
        {items.map((item, i) => (
          <Link key={i} className={styles.linkItem} to={item.link}>
            <MenuItem
              color={theme.palette.text.secondary}
              className={selected?.startsWith(item.pathname) ? `${styles.active}` : ``}
            >
              {item.icon}
              <Typography sx={{ marginLeft: '8px' }}>{item.name}</Typography>
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Container>
  );
};
