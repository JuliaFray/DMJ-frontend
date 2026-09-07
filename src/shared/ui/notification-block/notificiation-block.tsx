import React, { useState } from 'react';

import { BellIcon, BellRingingIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import reactStringReplace from 'react-string-replace';
import { v4 as uuidv4 } from 'uuid';

import { ActionIcon, Button, Divider, Indicator, List, Popover } from '@mantine/core';

import { useAuth } from '../../context';
import { useAppDispatch, useAppSelector } from '../../hook';
import { pathKeys } from '../../lib';
import { appActions, appSelector, toggleFriendProfile } from '../../model';
import { INotifications } from '../../types';

import styles from './Header.module.scss';

const NotificationTypes = {
  FOLLOW: 'FOLLOW',
  FRIEND: 'FRIEND',
  MSG: 'MSG',
};

const NotificationItem: React.FC<{ item?: INotifications; text?: string }> = ({ item, text }) => {
  const dispatch = useAppDispatch();
  const { authId } = useAuth();

  if (!item) {
    return (
      <>
        <List.Item key={uuidv4()} className={styles.item}>
          {text}
        </List.Item>
        <Divider />
      </>
    );
  }

  const toggleAgree = (isAgree: boolean) => {
    if (authId) {
      dispatch(
        toggleFriendProfile({
          userId: authId,
          query: `?fromId=${item.fromId}&isAgree=${isAgree}`,
        }),
      );
    }
  };

  if (item.type === NotificationTypes.FOLLOW || item.type === NotificationTypes.MSG) {
    return (
      <>
        <List.Item key={uuidv4()} className={styles.item}>
          {reactStringReplace(item.msg, '%s', (match, i) => (
            <Link to={pathKeys.user.byId({ id: item.fromId })}>{item.from}</Link>
          ))}
        </List.Item>
        <Divider />
      </>
    );
  }

  if (item.type === NotificationTypes.FRIEND) {
    return (
      <>
        <List.Item key={uuidv4()} className={styles.item}>
          {reactStringReplace(item.msg, '%s', (match, i) => (
            <Link to={pathKeys.user.byId({ id: item.fromId })}>{item.from}</Link>
          ))}
          <List.Item className={styles.subItem}>
            <Button
              size='small'
              variant='outlined'
              color='error'
              onClick={() => toggleAgree(false)}
            >
              Отклонить
            </Button>

            <Button
              size='small'
              variant='outlined'
              color='primary'
              onClick={() => toggleAgree(true)}
            >
              Принять
            </Button>
          </List.Item>
        </List.Item>
        <Divider />
      </>
    );
  }
  return (
    <List.Item key={uuidv4()} className={styles.item}>
      Уведомлений нет
    </List.Item>
  );
};

export const NotificationIcon = () => {
  const notifs = useAppSelector(appSelector.getAppAllNotifications);

  if (!notifs || !notifs.length) {
    return <BellIcon size={32} weight='light' />;
  }
  return (
    <Indicator
      style={{ width: 'fit-content', margin: '0 auto' }}
      label={notifs.length}
      position='bottom-end'
      autoContrast
      processing
      color='white'
    >
      <BellRingingIcon size={32} weight='fill' color='white' />
    </Indicator>
  );
};

export const NotificationBlock: React.FC = () => {
  const [opened, setOpened] = useState(false);

  const notifications = useAppSelector(appSelector.getAppAllNotifications);

  const dispatch = useAppDispatch();

  const onShowNotification = () => {
    setOpened((o) => !o);
  };

  const handleReadAll = () => {
    dispatch(appActions.removeNotification());
  };

  return (
    <Popover
      width={300}
      position='bottom'
      withArrow
      shadow='md'
      classNames={styles.notifications}
      opened={opened}
      onChange={setOpened}
    >
      <Popover.Target>
        <ActionIcon id='ntf' onClick={onShowNotification} aria-label='notifications'>
          <NotificationIcon />
        </ActionIcon>
      </Popover.Target>

      <Popover.Dropdown bg='var(--mantine-color-body)'>
        <List spacing='xs' size='sm' center>
          {notifications.length ? (
            notifications.map((it: INotifications) => <NotificationItem key={uuidv4()} item={it} />)
          ) : (
            <NotificationItem key={uuidv4()} text='Уведомлений нет' />
          )}

          <Button className={styles.btn} onClick={handleReadAll}>
            Отметить все прочитанными
          </Button>
        </List>
      </Popover.Dropdown>
    </Popover>
  );
};
