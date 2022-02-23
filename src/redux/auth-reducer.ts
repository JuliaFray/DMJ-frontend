import {stopSubmit} from 'redux-form';
import {GenericThunkType, InferActionType} from './redux-store';
import {ResultCodeEnum} from '../api/api-types';
import {authAPI} from '../api/auth-api';
import {loginAPI} from '../api/login-api';
import {securityAPI} from '../api/security-api';
import {Action} from 'redux';

type InitialStateType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    isFetching?: boolean,
    captchaUrl: string | null
};

type ActionsType = InferActionType<typeof actions> | Action<typeof stopSubmit>;
type ThunkType = GenericThunkType<ActionsType>;

let initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'SN/AUTH/SET_USER_DATA':
        case 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }

};

export const actions = {
    setAuthUserData: (state: InitialStateType) => ({
        type: 'SN/AUTH/SET_USER_DATA',
        payload: {id: state.id, email: state.email, login: state.login, isAuth: state.isAuth, captchaUrl: state.captchaUrl}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS',
        payload: {captchaUrl}
    } as const)
};

export const authUser = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me();
    if(meData.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = meData.data;
        dispatch(actions.setAuthUserData({id: id, email: email, login: login, isAuth: true, captchaUrl: null}))
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let loginData = await loginAPI.login(email, password, rememberMe, captcha);
    if(loginData.resultCode === ResultCodeEnum.Success) {
        dispatch(authUser())
    } else {
        if(loginData.resultCode === ResultCodeEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: message}));
    }
};

export const logout = (): ThunkType => async (dispatch) => {
    let response = await loginAPI.logout();
    if(response.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData({id: null, email: null, login: null, isAuth: false, captchaUrl: null}))
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const captchaData = await securityAPI.getCaptchaUrl();
    const captchaUrl = captchaData.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));

};

export default authReducer; 
