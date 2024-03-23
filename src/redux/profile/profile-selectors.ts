import {RootState} from "../redux-store";

export const getProfile = (state: RootState) => {
    return state.profile.profile;
};

export const getProfileAvatar = (state: RootState) => {
    return state.profile?.profile?.avatar?.length && state.profile?.profile?.avatar[0];
};

export const getProfileFullName = (state: RootState) => {
    const profile = state.profile?.profile || '';
    return profile ? (`${profile.secondName} ${profile.firstName} ${profile.lastName}`) : '';
};
