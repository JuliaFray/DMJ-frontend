import React, { FC, useCallback, useContext, useEffect, useState } from 'react';

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

import { ProfileContext } from 'shared/context';
import { useAppDispatch, useWebSocket } from 'shared/hook';
import { pathKeys, SocketEvents } from 'shared/lib';
import { appActions } from 'shared/model';
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
  {
    name: 'Вес и измерения',
    pathname: 'measure',
    link: pathKeys.measure.root(),
    icon: <StraightenIcon />,
  },
  {
    name: 'Общая лента',
    pathname: 'article',
    link: pathKeys.home(),
    icon: <ArticleIcon />,
  },
  { name: 'Настройки', pathname: 'settings', link: pathKeys.root, icon: <SettingsIcon /> },
];

export const MenuWidget: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { me, authId } = useContext(ProfileContext);

  const [selected, setSelected] = useState<string | undefined>();

  useEffect(() => {
    setSelected(pathname?.replaceAll('/', ''));
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

  return (
    <Container>
      <ListItem className={styles.listItem}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>

        <ListItemText>
          {!authId && <Typography color={theme.palette.text.primary}>Гость</Typography>}
          {!!authId && (
            <Link to={pathKeys.user.byId({ id: authId })}>
              <Typography color={theme.palette.text.primary}>{me?.login}</Typography>
              <Typography color={theme.palette.text.secondary}>{me?.email}</Typography>
            </Link>
          )}
        </ListItemText>
      </ListItem>

      {!authId && (
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
