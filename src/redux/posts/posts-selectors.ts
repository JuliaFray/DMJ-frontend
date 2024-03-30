import {RootState} from "../redux-store";

export const getPosts = (state: RootState) => {
    return state.posts.posts || []
};

export const getPost = (state: RootState) => {
    return state.posts.post
};

export const getLastFetchedTags = (state: RootState) => {
    return state.posts.tags
};

export const getIsFetching = (state: RootState) => {
    return state.posts.isFetching;
};

export const getImg = (state: RootState) => {
    return state.posts.img;
}
