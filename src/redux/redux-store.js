import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import profileReducer from "./profile-reducer";
import dialogReducer from "./dialog-reducer";
import sidebarReducer from "./sidebar-reducer";
import searchReducer from "./search-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from "./APP-reducer";



let reducers = combineReducers({
    profilePage: profileReducer,
    messagePage: dialogReducer,
    sidebar: sidebarReducer,
    search: searchReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));


// let store = createStore(reducers, applyMiddleware(thunkMiddleware) );
// window.store = store;

export default store;