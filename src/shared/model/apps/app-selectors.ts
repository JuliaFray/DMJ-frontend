import { SocketEvents } from '../../lib/DictConstants';
import { RootState } from '../redux-store';

export const getAppUserOnline = (state: RootState) => {
  return state.app.usersOnline;
};

export const getAppAllNotifications = (state: RootState) => {
  return state.app.notifications;
};

export const getAppInfoNotifications = (state: RootState) => {
  return state.app.notifications.filter((it) => it.type !== SocketEvents.MSG_EVENT);
};

export const getAppMsgNotifications = (state: RootState) => {
  return state.app.newMsgCounter;
};
