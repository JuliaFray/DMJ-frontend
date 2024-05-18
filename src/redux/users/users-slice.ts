import {IUser} from '../../types/types';
import {createSlice} from '@reduxjs/toolkit';
import {getAllUsers} from './users-thunks';

export type InitialStateType = {
    users: IUser[],
    totalCount: number,
    isFetching: boolean,
    userId: string | null
}

let initialState: InitialStateType = {
    isFetching: false,
    users: [],
    totalCount: 0,
    userId: null
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //=====getAllUsers=====//
            .addCase(getAllUsers.pending, (state, action) => {
                state.isFetching = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isFetching = false;
                if(action.payload) {
                    state.users = action.payload.data;
                    state.totalCount = action.payload.totalCount;
                }
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isFetching = false;
                state.users = [];
                state.totalCount = 0;
            })
    }
});

export default usersSlice.reducer;
