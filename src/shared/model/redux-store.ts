import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {appSlice} from './app';
import {authSlice} from './auth';
import {dialogSlice} from './dialog';
import {postsSlice} from './posts';
import {profileSlice} from './profile';
import {spinnerSlice} from './spinner';
import {usersSlice} from './users';
import {wsReducer} from './ws';

const rootReducer = {
    app: appSlice.appReducer,
    auth: authSlice.authReducer,
    profile: profileSlice.profileReducer,
    posts: postsSlice.postsReducer,
    user: usersSlice.usersReducer,
    dialog: dialogSlice.dialogReducer,
    spinner: spinnerSlice.spinnerReducer,
    ws: wsReducer.wsReducer
};
const store = configureStore({
        reducer: rootReducer,
        middleware: [
            ...getDefaultMiddleware({
                thunk: {
                    extraArgument: {}
                }
            })
        ]
    }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type InferActionType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
export type GenericThunkType<A extends Action, P = Promise<void>> = ThunkAction<P, RootState, unknown, A>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, {}, null, Action<string>>

export default store;
