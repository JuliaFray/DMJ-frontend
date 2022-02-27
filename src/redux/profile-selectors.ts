import {AppStateType} from "./redux-store";

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile;
};

export const getStatus = (state: AppStateType) => {
    return state.profilePage.status
};

export const getProfilePosts = (state: AppStateType) => {
    return state.profilePage.posts
};

export const getProfilePostText = (state: AppStateType) => {
    return state.profilePage.newPostText
};
