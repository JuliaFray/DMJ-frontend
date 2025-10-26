import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BallotIcon from '@mui/icons-material/Ballot';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsIcon from '@mui/icons-material/Settings';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import StraightenIcon from '@mui/icons-material/Straighten';
import { Button, CSSObject, Divider, styled, Tooltip, Typography } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
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

const drawerWidth = 25;

const openedMixin = (): CSSObject => ({
  width: `min(${drawerWidth}%, 400px)`,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  backgroundColor: theme.palette.primary.main,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(() => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(),
        '& .MuiDrawer-paper': openedMixin(),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(),
        '& .MuiDrawer-paper': closedMixin(),
      },
    },
  ],
}));

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

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const MenuWidget: FC<Props> = ({ open, setOpen }) => {
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

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer variant='permanent' open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon color='info' />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem className={styles.listItem} disablePadding sx={{ display: 'block' }}>
          <Link to={authId ? pathKeys.user.byId({ id: authId }) : pathKeys.login()}>
            <ListItemButton
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                      justifyContent: 'initial',
                    }
                  : {
                      justifyContent: 'center',
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: 'auto',
                      },
                ]}
              >
                <AccountCircleIcon />
              </ListItemIcon>

              <ListItemText
                sx={[
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
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

          {!authId && open && (
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
                    open
                      ? {
                          justifyContent: 'initial',
                        }
                      : {
                          justifyContent: 'center',
                        },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: 'center',
                      },
                      open
                        ? {
                            mr: 3,
                          }
                        : {
                            mr: 'auto',
                          },
                    ]}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={[
                      open
                        ? {
                            opacity: 1,
                          }
                        : {
                            opacity: 0,
                          },
                    ]}
                  />
                </ListItemButton>
              </Tooltip>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
