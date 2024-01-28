import {RootState} from "../redux-store";

export const getUsers = (state: RootState) => {
    return state.user.users
};

export const getPageSize = (state: RootState) => {
    return state.user.pageSize
};

export const getFollowingInProgress = (state: RootState) => {
    return state.user.followingInProgress
};

export const getTotalUsersCount = (state: RootState) => {
    return state.user.totalUsersCount
};

export const getCurrentPage = (state: RootState) => {
    return state.user.currentPage
};

export const getUserId = (state: RootState) => {
    return state.user.userId
};

export const getIsFetching = (state: RootState) => {
    return state.user.isFetching
};

export const getUsersFilter = (state: RootState) => {
    return state.user.filter
};
