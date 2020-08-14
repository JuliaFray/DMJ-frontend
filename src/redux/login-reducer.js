import {loginAPI} from '../API/API';

const SET_USER_DATA = 'SET-USER-DATA';

let initialState = {
    email: '',
    password: '',
    rememberMe: false
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state
            }
        default: return state;
    }

};

// export const setUserData = (userId, email, login) => ({ type: SET_USER_DATA, data: { userId, email, login } });

export const login = () => {
    return (dispatch) => {
        loginAPI
            .login()
            .then(data => {
                // let { id, email, login } = data.data;
                // dispatch(setUserData(id, email, login))
            })
    }
};

export const logout = () => {
    return (dispatch) => {
        loginAPI
            .logout()
            .then(data => {
                // let { id, email, login } = data.data;
                // dispatch(setUserData(id, email, login))
            })
    }
}

export default loginReducer; 
