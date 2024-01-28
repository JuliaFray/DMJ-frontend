import {createSlice} from '@reduxjs/toolkit';
import {checkAuth, login} from './auth-thunks';

type InitialStateType = {
    id: string,
    isAuth: boolean,
    isFetching?: boolean
};

let initialState: InitialStateType = {
    id: '',
    isAuth: false,
    isFetching: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuth = false;
            state.id = '';
            window.localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            //=====authUser=====//
            .addCase(checkAuth.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isFetching = false;
                state.isAuth = action.payload;
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
                    state.id = action.payload.id;
                }
            })
            .addCase(login.rejected, (state) => {
                state.isFetching = false;
            })

    }
});


export default authSlice.reducer;
export const authActions = authSlice.actions;
