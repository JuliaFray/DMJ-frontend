import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../hook';
import { SocketEvents } from '../lib';
import { appActions } from '../model';
import { wsConnect, wsShowReconnect } from '../model/ws/ws';
import { Nullable } from '../types';
import { Spinner } from '../ui';

import { useAuth } from '.';

export const WebSocketContext = createContext<WebSocket | null>(null);

export const WebSocketProvider = ({ children }) => {
  const dispatch = useAppDispatch();

  const ws = useAppSelector((state) => state.ws);

  const { authId, isAuth } = useAuth();

  const [conn, setConn] = useState<Nullable<WebSocket>>(null);
  const [tryingAgainIn, setTryingAgainIn] = useState(5);
  const [silentConnect, setSilentConnect] = useState(true);
  const [intervalID, setIntervalID] = useState<number>();
  const [tries, setTries] = useState(0);

  const onNewSocket = (newSocket: WebSocket) => {
    setConn(newSocket);
  };

  const retry = useCallback(() => {
    dispatch(wsConnect(onNewSocket, authId));
    setTries((count) => count + 1);
    setTryingAgainIn(5);
    clearInterval(intervalID);
    setIntervalID(undefined);
  }, [dispatch, intervalID, authId]);

  const handleClose = useCallback(
    (e: { wasClean: any }) => {
      if (e.wasClean) return;

      dispatch(wsShowReconnect());
      setTries(0);
      setSilentConnect(true);
      dispatch(wsConnect(onNewSocket, authId));
    },
    [dispatch, authId],
  );

  const handleOpen = useCallback(() => {
    if (!silentConnect) return;
    setSilentConnect(false);
  }, [silentConnect]);

  useEffect(() => {
    if (ws.error && !intervalID) {
      const id = window.setInterval(() => {
        setTryingAgainIn((state) => state - 1);
      }, 1000);

      setIntervalID(id);
    }

    return () => {
      if (!intervalID) return;
      clearInterval(intervalID);
    };
  }, [intervalID, ws.error]);

  useEffect(() => {
    if (tryingAgainIn <= 0) {
      retry();
    }
  }, [intervalID, retry, tryingAgainIn]);

  const handleWS = useCallback((e: MessageEvent<string>) => {
    const { type, data, msg } = JSON.parse(e.data);
    if (type === SocketEvents.LOGOUT_EVENT) {
      dispatch(
        appActions.setUsersOnline({
          type: 'app/setUserOnline',
          payload: data,
        }),
      );
    }
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
          type: 'app/setUserOnline',
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
      dispatch(
        appActions.addNotification({
          type: 'app/addNotification',
          payload: msg,
        }),
      );
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(wsConnect(onNewSocket, authId));
    }
  }, [authId, dispatch, isAuth]);

  useEffect(() => {
    if (!conn) return;

    conn.addEventListener('open', handleOpen);
    conn.addEventListener('close', handleClose);
    conn.addEventListener('message', handleWS);

    return () => {
      conn.removeEventListener('open', handleOpen);
      conn.removeEventListener('close', handleClose);
      conn.removeEventListener('message', handleWS);
    };
  }, [conn, handleClose, handleOpen]);

  useEffect(() => {
    if (!isAuth || !conn) return;
    const payload = { type: SocketEvents.AUTH_EVENT, id: authId };
    conn.send(JSON.stringify(payload));
  }, [isAuth, conn, authId]);

  if (!silentConnect && (ws.connecting || ws.error)) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {ws.error && (
          <div>
            {tries > 0 && <p>Упс... Кажется, что-то сломалось :(</p>}
            <button type='button' onClick={retry}>
              Попробовать снова ({tryingAgainIn})
            </button>
          </div>
        )}
        {!ws.error && <Spinner />}
      </div>
    );
  }

  if ((ws.connected && !ws.error) || silentConnect) {
    return <WebSocketContext.Provider value={conn}>{children}</WebSocketContext.Provider>;
  }

  return <div>Техническое обслуживание</div>;
};

export const useWebSocket = () => useContext(WebSocketContext);
