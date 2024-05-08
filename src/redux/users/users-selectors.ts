import {RootState} from "../redux-store";

export const getUsers = (state: RootState) => {
    return state.user.users
};

export const getDataLength = (state: RootState) => {
    return state.user.dataLength
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
