import {createSlice} from '@reduxjs/toolkit';
import {checkAuth, login, registerUser} from './auth-thunks';

type ValidationError = Record<string, any>

type InitialStateType = {
    id: string,
    isAuth: boolean,
    isFetching?: boolean,
    errors: ValidationError,
    globalError: string
};

let initialState: InitialStateType = {
    id: '',
    isAuth: false,
    isFetching: false,
    errors: {},
    globalError: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuth = false;
            state.id = '';
            window.localStorage.removeItem('token');
        },
        setErrors: (state, payload) => {
            if (payload.payload instanceof Array) {
                payload.payload.forEach((err: any) => {
                    state.errors[err.field] = err.msg;
                });
            } else {
                state.errors = payload.payload;
            }

        },
        setGlobalError: (state, payload) => {
            state.globalError = payload.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            //=====checkAuth=====//
            .addCase(checkAuth.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isFetching = false;
                state.isAuth = true;
                if(action.payload) {
                    state.id = action.payload?._id
                }
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isFetching = false;
            })
            //=====login=====//
            .addCase(login.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isFetching = false;
                if(action.payload) {
                    state.isAuth = true;
                    state.id = action.payload._id;
                    state.globalError = '';
                    state.errors = [];
                }
            })
            .addCase(login.rejected, (state) => {
                state.isFetching = false;
            })
            //=====registerUser=====//
            .addCase(registerUser.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isFetching = false;
                if(action.payload) {
                    state.isAuth = true;
                    state.id = action.payload._id;
                    state.globalError = '';
                    state.errors = [];
                }
            })
            .addCase(registerUser.rejected, (state) => {
                state.isFetching = false;
            })

    }
});


export default authSlice.reducer;
export const authActions = authSlice.actions;
