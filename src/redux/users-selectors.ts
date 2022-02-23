import {AppStateType} from "./redux-store";

export const getUsers = (state: AppStateType) => {
    return state.usersPage.users
};

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
};

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
};

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
};

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
};

export const getUserId = (state: AppStateType) => {
    return state.usersPage.userId
};

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
};
