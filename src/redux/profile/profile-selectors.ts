import {RootState} from "../redux-store";

export const getProfile = (state: RootState) => {
    return state.profile.profile;
};

export const getStatus = (state: RootState) => {
    return ''
};

export const getProfileAvatar = (state: RootState) => {
    return state.profile?.profile?.avatarUrl;
};

export const getProfileFullName = (state: RootState) => {
    const profile = state.profile?.profile || '';
    return profile ? (`${profile.secondName} ${profile.firstName} ${profile.lastName}`) : '';
};
