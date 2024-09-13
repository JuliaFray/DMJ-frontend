import {RootState} from "./../redux-store";

export const getUsers = (state: RootState) => {
    return state.user.users
};

export const getTotalCount = (state: RootState) => {
    return state.user.totalCount
};

export const getIsFetching = (state: RootState) => {
    return state.user.isFetching
};
