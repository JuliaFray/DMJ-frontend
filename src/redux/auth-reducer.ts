import {stopSubmit} from 'redux-form';
import {GenericThunkType, InferActionType} from './redux-store';
import {ResultCodeEnum} from '../api/api-types';
import {authAPI} from '../api/auth-api';
import {loginAPI} from '../api/login-api';
import {securityAPI} from '../api/security-api';
import {Action} from 'redux';

type InitialStateType = {
    id: string,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    isFetching?: boolean,
    captchaUrl: string | null
};

type ActionsType = InferActionType<typeof actions> | Action<typeof stopSubmit>;
type ThunkType = GenericThunkType<ActionsType>;

let initialState: InitialStateType = {
    id: '',
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
        let {_id, email, fullName} = meData.data;
        dispatch(actions.setAuthUserData({id: _id, email: email, login: fullName, isAuth: true, captchaUrl: null}))
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => async (dispatch) => {
    let loginData = await loginAPI.login(email, password, rememberMe, captcha);
    if(loginData.resultCode === ResultCodeEnum.Success) {
        if ('token' in loginData) {
            window.localStorage.setItem('token', loginData.token)
        }
        dispatch(authUser())
    } else {
        if(loginData.resultCode === ResultCodeEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }
        let message = 'Some error';
        dispatch(stopSubmit('login', {_error: message}));
    }
};

export const logout = (): ThunkType => async (dispatch) => {
    // let response = await loginAPI.logout();
    // if(response.resultCode === ResultCodeEnum.Success) {
    //
    // }
    dispatch(actions.setAuthUserData({id: '', email: null, login: null, isAuth: false, captchaUrl: null}));
    window.localStorage.removeItem('token');
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const captchaData = await securityAPI.getCaptchaUrl();
    const captchaUrl = captchaData.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));

};

export default authReducer; 
