import {WS_CONNECT_ERR, WS_CONNECT_START, WS_CONNECTED, WS_SHOW_RECONNECT} from '../../Utils/DictConstants';
import {AppDispatch, RootState} from '../redux-store';


interface OnNewSocket {
    (newSocket: WebSocket): void;
}

export const wsConnect = (onNewSocket: OnNewSocket, authId: string | undefined) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch({type: WS_CONNECT_START});

        try {
            const ws = await new Promise<WebSocket>((resolve, reject) => {
                const socket = new WebSocket(process.env.REACT_APP_WS_URL + `${authId ? `?authId=${authId}` : ''}` || 'ws://localhost:8080');

                socket.onopen = () => resolve(socket);
                socket.onerror = (e) => reject(e);
            });

            onNewSocket(ws);

            dispatch({
                type: WS_CONNECTED,
            });
        } catch(err) {
            dispatch({
                type: WS_CONNECT_ERR,
                payload: err instanceof Object ? err.toString() : "Unknown error",
            });
        }
    };

export const wsShowReconnect = () => async (dispatch: AppDispatch) => {
    dispatch({
        type: WS_SHOW_RECONNECT,
    });
};
