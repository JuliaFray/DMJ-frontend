import {authUser} from './auth-reducer'
import {InferActionType} from './redux-store';

export type InitialStateType = {
    initialized: boolean,
    globalError?: string
}
type ActionsType = InferActionType<typeof actions>;

let initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
};

export const actions = {
    setInitialized: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
};

export const initializeApp = () => {
    return (dispatch: any) => {
        let promise = dispatch(authUser());
        promise.then(() => {
            dispatch(actions.setInitialized());
        })
    }
};

export default appReducer;
