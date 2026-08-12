import React, { FC, useCallback, useContext, useEffect, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BallotIcon from '@mui/icons-material/Ballot';
import SettingsIcon from '@mui/icons-material/Settings';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import StraightenIcon from '@mui/icons-material/Straighten';
import { Button, Divider, Tooltip, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
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

interface MenuWidgetProps {
  close: () => void;
}

export const MenuWidget: FC<MenuWidgetProps> = ({ close }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { me, authId } = useContext(ProfileContext);

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

  return (
    <List>
      <ListItem className={styles.listItem} disablePadding sx={{ display: 'block' }}>
        <Link to={authId ? pathKeys.user.byId({ id: authId }) : pathKeys.login()}>
          <ListItemButton
            sx={[
              {
                minHeight: 48,
                px: 2.5,
                justifyContent: 'initial',
              },
            ]}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: 'center',
                  mr: 3,
                },
              ]}
            >
              <AccountCircleIcon />
            </ListItemIcon>

            <ListItemText
              sx={[
                {
                  opacity: 1,
                },
              ]}
            >
              {!authId && <Typography color={theme.palette.text.primary}>Гость</Typography>}
              {!!authId && (
                <>
                  <Typography color={theme.palette.text.primary}>{me?.login}</Typography>
                  <Typography color={theme.palette.text.secondary}>{me?.email}</Typography>
                </>
              )}
            </ListItemText>
          </ListItemButton>
        </Link>

        {!authId && (
          <Button
            type='button'
            size='large'
            variant='contained'
            style={{ margin: '8px auto', width: '90%', display: 'block' }}
            onClick={() => navigate(pathKeys.login())}
          >
            Войти
          </Button>
        )}
      </ListItem>

      <Divider />

      {items.map((item, i) => (
        <ListItem
          key={i}
          disablePadding
          sx={{ display: 'block' }}
          className={selected?.startsWith(item.pathname) ? `${styles.active}` : ``}
        >
          <Link key={i} className={styles.linkItem} to={item.link}>
            <Tooltip title={item.name}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  {
                    justifyContent: 'initial',
                  },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    {
                      mr: 3,
                    },
                  ]}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={[
                    {
                      opacity: 1,
                    },
                  ]}
                />
              </ListItemButton>
            </Tooltip>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};
