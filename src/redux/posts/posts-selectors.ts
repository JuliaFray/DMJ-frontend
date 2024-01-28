import {RootState} from "../redux-store";

export const getNewPostId = (state: RootState) => {
    return state.posts.newPostId;
};

export const getPosts = (state: RootState) => {
    return state.posts.posts
};
