import {Action, applyMiddleware, combineReducers, compose, createStore} from 'redux';
import profileReducer from './profile-reducer';
import dialogReducer from './dialog-reducer';
import sidebarReducer from './sidebar-reducer';
import searchReducer from './search-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from './app-reducer';


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    sidebar: sidebarReducer,
    search: searchReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
});

export type InferActionType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
export type GenericThunkType<A extends Action, P = Promise<void>> = ThunkAction<P, AppStateType, unknown, A>;

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
