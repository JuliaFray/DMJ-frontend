import {FilterType, UserType} from '../../types/types';
import {createSlice} from '@reduxjs/toolkit';
import {getAllUsers} from './users-thunks';

export type InitialStateType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<string>,
    userId: number | null,
    filter: FilterType
}

let initialState: InitialStateType = {
    isFetching: false,
    users: [],
    totalUsersCount: 0,

    followingInProgress: [],
    userId: null,

    pageSize: 10,
    currentPage: 1,
    filter: {
        term: '',
        friend: null
    }
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setFetchSettings: (state, action) => {
            state.pageSize = action.payload.pageSize;
            state.currentPage = action.payload.currentPage;
            state.filter = action.payload.filter;
        }
    },
    extraReducers: (builder) => {
        builder
            //=====getAllUsers=====//
            .addCase(getAllUsers.pending, (state, action) => {
                state.isFetching = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isFetching = false;
                state.users = action.payload?.items;
                state.totalUsersCount = action.payload?.totalCount;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isFetching = false;
                state.users = [];
                state.totalUsersCount = 0;
            })
    }
});

export default usersSlice.reducer;
