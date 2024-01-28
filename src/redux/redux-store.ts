import {Action} from 'redux';
import profileSlice from './profile/profile-slice';
import authSlice from './auth/auth-slice';
import userSlice from './users/users-slice';
import postsSlice from './posts/posts-slice';
import appSlice from './app/app-slice';
import {ThunkAction} from 'redux-thunk';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

const rootReducer = {
    app: appSlice,
    auth: authSlice,
    profile: profileSlice,
    posts: postsSlice,
    user: userSlice,
    // dialogPage: dialogReducer,
    // sidebar: sidebarReducer,
    // search: searchReducer,
    // form: formReducer
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
