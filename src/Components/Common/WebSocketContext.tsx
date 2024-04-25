import React, {createContext, useCallback, useEffect, useState} from 'react';
import {useAppDispatch} from '../../hook/hooks';
import {useSelector} from 'react-redux';
import {wsConnect, wsShowReconnect} from '../../redux/ws/ws';
import {getAuthId} from '../../redux/auth/auth-selectors';

export const WebSocketContext = createContext<WebSocket | null>(null);

function WS(props: React.PropsWithChildren<{}>) {
    const dispatch = useAppDispatch();

    // @ts-ignore
    const ws = useSelector((state) => state.ws);
    const authId = useSelector(getAuthId);

    const [conn, setConn] = useState<WebSocket | null>(null);
    const [tryingAgainIn, setTryingAgainIn] = useState(5);
    const [silentConnect, setSilentConnect] = useState(false);
    const [intervalID, setIntervalID] = useState<number>();
    const [tries, setTries] = useState(0);

    const onNewSocket = (newSocket: WebSocket) => {
        setConn(newSocket);
    };

    const retry = useCallback(() => {
        dispatch(wsConnect(onNewSocket));
        setTries((count) => count + 1);
        setTryingAgainIn(5);
        clearInterval(intervalID);
        setIntervalID(undefined);
    }, [dispatch, intervalID]);

    const handleClose = useCallback(
        (e: { wasClean: any; }) => {
            if(e.wasClean) return;

            dispatch(wsShowReconnect());
            setTries(0);
            setSilentConnect(true);
            dispatch(wsConnect(onNewSocket));
        },
        [dispatch]
    );

    const handleOpen = useCallback(() => {
        if(!silentConnect) return;
        setSilentConnect(false);
    }, [silentConnect]);


    useEffect(() => {
        if(ws.error && !intervalID) {
            const id = window.setInterval(() => {
                setTryingAgainIn((state) => state - 1);
            }, 1000);

            setIntervalID(id);
        }

        return () => {
            if(!intervalID) return;
            clearInterval(intervalID);
        };
    }, [intervalID, ws.error]);

    useEffect(() => {
        if(tryingAgainIn <= 0) {
            retry();
        }
    }, [intervalID, retry, tryingAgainIn]);

    useEffect(() => {
        dispatch(wsConnect(onNewSocket));
    }, []);

    useEffect(() => {
        if(!conn) return;

        conn.addEventListener('open', handleOpen);
        conn.addEventListener('close', handleClose);

        return () => {
            conn.removeEventListener('open', handleOpen);
            conn.removeEventListener('close', handleClose);
        };
    }, [conn, handleClose, handleOpen]);

    useEffect(() => {
        if(!authId || !conn) return;
        const payload = {type: 'AUTH_EVENT', id: authId};
        conn.send(JSON.stringify(payload));
    }, [authId, conn]);

    if(!silentConnect && (ws.connecting || ws.error)) {
        return (
            <div className='appLoad showAfter100ms'>
                {ws.error && (
                    <div className='error'>
                        {tries > 0 && <p>Упс... Кажется, что-то сломалось :(</p>}
                        <button onClick={retry}>Попробовать снова ({tryingAgainIn})</button>
                    </div>
                )}
                {!ws.error && (
                    <>
                        <h2>Соединение с сервером</h2>
                    </>
                )}
            </div>
        );
    }

    if((ws.connected && !ws.error) || silentConnect) {
        return (
            <WebSocketContext.Provider value={conn}>
                {props.children}
            </WebSocketContext.Provider>
        );
    }

    return (<div>Техническое обслуживание</div>);
}

export default WS;
