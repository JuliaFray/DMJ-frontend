import {RootState} from "../redux-store";

export const getPosts = (state: RootState) => {
    return state.posts.posts || []
};

export const getDataLength = (state: RootState) => {
    return state.posts.dataLength || 0
};

export const getPost = (state: RootState) => {
    return state.posts.post
};

export const getTags = (state: RootState) => {
    return state.posts.tags
};

export const getAllFetchedTags = (state: RootState) => {
    return state.posts.allTags
};

export const getIsFetching = (state: RootState) => {
    return state.posts.isFetching;
};

export const getImg = (state: RootState) => {
    return state.posts.img;
}
