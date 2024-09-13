import {RootState} from "./../redux-store";

export const getProfile = (state: RootState) => {
    return state.profile.profile;
};

export const getProfileAvatar = (state: RootState) => {
    return state.profile?.profile?.avatar;
};

export const getProfileFullName = (state: RootState) => {
    const profile = state.profile?.profile || '';
    return profile ? (`${profile.secondName} ${profile.firstName} ${profile.lastName}`) : '';
};

export const getMyProfile = (state: RootState) => {
    return state.profile.my;
};

export const getMyProfileAvatar = (state: RootState) => {
    return state.profile?.my?.avatar;
};

export const getMyProfileFullName = (state: RootState) => {
    const profile = state.profile?.my || '';
    return profile ? (`${profile.secondName} ${profile.firstName} ${profile.lastName}`) : '';
};

export const getStats = (state: RootState) => {
    return state.profile.stats;
};

export const getIsFetching = (state: RootState) => {
    return state.profile.isFetching;
};
