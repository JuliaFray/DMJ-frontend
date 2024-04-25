import {AnyAction} from 'redux';
import {WS_CONNECT_ERR, WS_CONNECT_START, WS_CONNECTED, WS_SHOW_RECONNECT} from '../Utils/DictConstants';

const initialState = {
    connecting: false,
    connected: false,
    error: null,
    showReconnect: false,
};

export default function wsReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case WS_CONNECT_START:
            return {
                ...state,
                connecting: true,
                connected: false,
                error: null,
            };
        case WS_CONNECTED:
            return {
                ...state,
                connecting: false,
                connected: true,
                showReconnect: false,
            };
        case WS_CONNECT_ERR:
            return {
                ...state,
                connecting: false,
                connected: false,
                error: action.payload,
            };
        case WS_SHOW_RECONNECT:
            return {
                ...state,
                showReconnect: true,
            };
        default:
            return state;
    }
}
