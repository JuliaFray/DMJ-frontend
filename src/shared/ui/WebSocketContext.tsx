import React, { createContext, useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../hook';
import { SocketEvents } from '../lib';
import { authSelector } from '../model';
import { wsConnect, wsShowReconnect } from '../model/ws/ws';
import { Nullable } from '../types';

import { Spinner } from './spinner';

export const WebSocketContext = createContext<WebSocket | null>(null);

export const WS = (props: React.PropsWithChildren<unknown>) => {
  const dispatch = useAppDispatch();

  const ws = useAppSelector((state) => state.ws);

  const authId = useAppSelector(authSelector.getAuthId);
  const isAuth = !!authId || window.localStorage.getItem('token');

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

  useEffect(() => {
    dispatch(wsConnect(onNewSocket, authId));
  }, [authId, dispatch]);

  useEffect(() => {
    if (!conn) return;

    conn.addEventListener('open', handleOpen);
    conn.addEventListener('close', handleClose);

    return () => {
      conn.removeEventListener('open', handleOpen);
      conn.removeEventListener('close', handleClose);
    };
  }, [conn, handleClose, handleOpen]);

  useEffect(() => {
    if (!isAuth || !conn) return;
    const payload = { type: SocketEvents.AUTH_EVENT, id: authId };
    conn.send(JSON.stringify(payload));
  }, [isAuth, conn]);

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
    return <WebSocketContext.Provider value={conn}>{props.children}</WebSocketContext.Provider>;
  }

  return <div>Техническое обслуживание</div>;
};
