import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TUser} from 'entities/profile';
import {usersApi} from "shared/api/users-api";

export type TInitial = {
    users: TUser[],
    totalCount: number,
    isFetching: boolean,
    userId: string | null
}

let initialState: TInitial = {
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
            .addMatcher(
                usersApi.endpoints.getAllUsers.matchPending,
                (state: TInitial, action: PayloadAction<any, string, any>) => {
                    state.isFetching = true;
                }
            )
            .addMatcher(
                usersApi.endpoints.getAllUsers.matchFulfilled,
                (state: TInitial, action: PayloadAction<any, string, any>) => {
                    state.users = action.payload.data;
                    state.totalCount = action.payload.totalCount;
                    state.isFetching = false;
                }
            )
            .addMatcher(
                usersApi.endpoints.getAllUsers.matchRejected,
                (state: TInitial, action: PayloadAction<any, string, any>) => {
                    state.isFetching = false;
                    state.users = [];
                    state.totalCount = 0;
                }
            );
    }
});

const usersActions = usersSlice.actions;
const usersReducer = usersSlice.reducer;

export {usersSlice, usersActions, usersReducer}
