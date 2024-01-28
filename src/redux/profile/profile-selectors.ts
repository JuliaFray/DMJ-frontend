import {RootState} from "../redux-store";

export const getProfile = (state: RootState) => {
    return state.profile.profile;
};

export const getStatus = (state: RootState) => {
    return state.profile?.profile?.status
};
