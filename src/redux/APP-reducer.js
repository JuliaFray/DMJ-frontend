import { authTC } from './auth-reducer'

const SET_UINITIALIZED = 'SET-UINITIALIZED';

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_UINITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default: return state;
    }
};

export const setInitialized = () => ({ type: SET_UINITIALIZED });

export const initializeApp = () => {
    return (dispatch) => {
        let promise = dispatch(authTC());
        promise.then(() => {
            dispatch(setInitialized());
        })
    }
};

export default appReducer; 