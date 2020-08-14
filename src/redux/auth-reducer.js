import { authAPI } from './../API/API';
import { loginAPI } from '../API/API';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'SET-USER-DATA';

let initialState = {
    id: null,
    isFetching: false,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default: return state;
    }

};

export const setUserData = (id, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: { id, email, login, isAuth }
});

export const authTC = () => async (dispatch) => {
    let response = await authAPI.me();

    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch(setUserData(id, email, login, true))
    }
};

export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await loginAPI.login(email, password, rememberMe);

    if (response.data.resultCode === 0) {
        dispatch(authTC())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'some error';
        dispatch(stopSubmit('login', { _error: message }))
    }
};

export const logout = () => async (dispatch) => {
    let response = await loginAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
    }
};

export default authReducer; 