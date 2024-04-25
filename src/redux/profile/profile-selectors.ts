import {RootState} from "../redux-store";

export const getProfile = (state: RootState) => {
    return state.profile.profile;
};

export const getStats = (state: RootState) => {
    return state.profile.stats;
};

export const getProfileAvatar = (state: RootState) => {
    return state.profile?.profile?.avatar;
};

export const getProfileFullName = (state: RootState) => {
    const profile = state.profile?.profile || '';
    return profile ? (`${profile.secondName} ${profile.firstName} ${profile.lastName}`) : '';
};

export const getIsFetching = (state: RootState) => {
    return state.profile.isFetching;
};
