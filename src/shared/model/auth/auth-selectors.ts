import {RootState} from "./../redux-store";

export const getIsAuth = (state: RootState) => {
    return state.auth.isAuth
};

export const getIsFetching = (state: RootState) => {
    return state.auth.isFetching;
};

export const getAuthId = (state: RootState) => {
    return state.auth.id
};

export const getAuthErrors = (state: RootState) => {
    return state.auth.errors
};

export const getGlobalError = (state: RootState) => {
    return state.auth.globalError
};
