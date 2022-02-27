import {AppStateType} from "./redux-store";

export const getCaptchaUrl = (state: AppStateType) => {
    return state.auth.captchaUrl
};

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
};

export const getIsFetching = (state: AppStateType) => {
    return state.auth.isFetching;
};

export const getAuthId = (state: AppStateType) => {
    return state.auth.id
};

export const getLogin = (state: AppStateType) => {
    return state.auth.login
};
